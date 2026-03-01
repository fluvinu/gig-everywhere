import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MapPin, Check, BadgeCheck, Wallet, CreditCard, Banknote } from "lucide-react";
import { gigs } from "@/data/gigs";
import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
];

type PaymentMethod = "cod" | "online" | "wallet";

const paymentMethods = [
  { id: "cod" as PaymentMethod, label: "Cash on Delivery", icon: Banknote, desc: "Pay when service is completed" },
  { id: "online" as PaymentMethod, label: "Pay Online", icon: CreditCard, desc: "UPI / Card / Net Banking" },
  { id: "wallet" as PaymentMethod, label: "Wallet", icon: Wallet, desc: "GigGo Wallet — ₹0 balance" },
];

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const gig = gigs.find((g) => g.id === id);

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [confirmed, setConfirmed] = useState(false);

  if (!gig) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-heading font-semibold">Gig not found</p>
      </div>
    );
  }

  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const handleConfirm = async () => {
    if (!user) { toast.error("Please sign in to book"); navigate("/auth"); return; }
    if (!selectedDate && selectedDate !== 0) { toast.error("Please select a date"); return; }
    if (!selectedTime) { toast.error("Please select a time slot"); return; }
    if (!address.trim()) { toast.error("Please enter your address"); return; }

    const bookingDate = dates[selectedDate!];
    const { error } = await supabase.from("bookings").insert({
      user_id: user.id,
      gig_id: gig.id,
      gig_title: gig.title,
      provider_name: gig.provider.name,
      price: gig.price,
      booking_date: bookingDate.toISOString().split("T")[0],
      booking_time: selectedTime,
      address: address.trim(),
      payment_method: payment,
    });

    if (error) { toast.error("Booking failed: " + error.message); return; }
    setConfirmed(true);
    toast.success("Booking confirmed! 🎉");
  };

  if (confirmed) {
    return (
      <AppLayout>
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <ConfirmationView gig={gig} dates={dates} selectedDate={selectedDate!} selectedTime={selectedTime!} payment={payment} />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {/* Header */}
      <header className="md:hidden sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-secondary hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading text-lg font-bold text-foreground">Book Service</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 mt-4 pb-28 md:pb-10">
        {/* Desktop back */}
        <div className="hidden md:flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-secondary hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading text-2xl font-bold text-foreground">Book Service</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Form */}
          <div className="flex-1 min-w-0">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              {/* Service Summary */}
              <div className="bg-card border border-border rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    {gig.provider.avatar}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-heading font-semibold text-sm">{gig.title}</h2>
                    <p className="text-xs text-muted-foreground">{gig.provider.name}</p>
                  </div>
                  <span className="font-heading text-lg font-bold text-primary">₹{gig.price}</span>
                </div>
              </div>

              {/* Select Date */}
              <h2 className="font-heading text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Select Date
              </h2>
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                {dates.map((date, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(i)}
                    className={`flex-shrink-0 flex flex-col items-center w-14 py-2.5 rounded-xl border transition-all ${
                      selectedDate === i
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-card border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    <span className="text-[10px] font-medium opacity-70">
                      {date.toLocaleDateString("en-IN", { weekday: "short" })}
                    </span>
                    <span className="text-lg font-bold">{date.getDate()}</span>
                    <span className="text-[10px] opacity-70">
                      {date.toLocaleDateString("en-IN", { month: "short" })}
                    </span>
                  </button>
                ))}
              </div>

              {/* Select Time */}
              <h2 className="font-heading text-sm font-bold text-foreground mt-4 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> Select Time
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2.5 rounded-xl text-xs font-medium border transition-all ${
                      selectedTime === slot
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-card border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              {/* Address */}
              <h2 className="font-heading text-sm font-bold text-foreground mt-6 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> Your Address
              </h2>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full address for the service provider..."
                className="w-full bg-card border border-border rounded-xl p-3 text-sm outline-none resize-none h-24 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/50"
              />

              {/* Payment Method */}
              <h2 className="font-heading text-sm font-bold text-foreground mt-6 mb-3 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" /> Payment Method
              </h2>
              <div className="space-y-2">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPayment(pm.id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left ${
                      payment === pm.id
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      payment === pm.id ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
                    }`}>
                      <pm.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{pm.label}</p>
                      <p className="text-xs text-muted-foreground">{pm.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      payment === pm.id ? "border-primary" : "border-border"
                    }`}>
                      {payment === pm.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Order Summary (Desktop) */}
          <div className="hidden lg:block w-[340px] flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-heading font-bold text-foreground mb-4">Order Summary</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    {gig.provider.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{gig.title}</p>
                    <p className="text-xs text-muted-foreground">{gig.provider.name}</p>
                  </div>
                </div>
                <div className="border-t border-border pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="font-medium">₹{gig.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform Fee</span>
                    <span className="font-medium">₹49</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{gig.price + 49}</span>
                  </div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                  <Banknote className="w-3 h-3" />
                  {payment === "cod" ? "Cash on Delivery" : payment === "online" ? "Online Payment" : "Wallet"}
                </div>
                <button
                  onClick={handleConfirm}
                  className="w-full mt-4 bg-primary text-primary-foreground font-heading font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Confirm Bar */}
      <div className="lg:hidden fixed bottom-16 md:bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border px-4 py-3">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleConfirm}
            className="w-full bg-primary text-primary-foreground font-heading font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98] transform"
          >
            Confirm Booking — ₹{gig.price}
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

// Confirmation sub-component
const ConfirmationView = ({ gig, dates, selectedDate, selectedTime, payment }: {
  gig: any; dates: Date[]; selectedDate: number; selectedTime: string; payment: PaymentMethod;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center max-w-sm"
  >
    <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
      <Check className="w-10 h-10 text-success" />
    </div>
    <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
    <p className="text-sm text-muted-foreground mb-2">
      {gig.provider.name} will arrive on{" "}
      {dates[selectedDate].toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" })}{" "}
      at {selectedTime}
    </p>
    <p className="text-xs text-muted-foreground mb-6">
      Payment: {payment === "cod" ? "💵 Cash on Delivery" : payment === "online" ? "💳 Online" : "👛 Wallet"}
    </p>
    <div className="bg-card border border-border rounded-2xl p-4 text-left mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
          {gig.provider.avatar}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm">{gig.provider.name}</span>
            <BadgeCheck className="w-3.5 h-3.5 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">{gig.title}</p>
        </div>
      </div>
      <div className="border-t border-border pt-3 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="font-heading text-lg font-bold text-primary">₹{gig.price}</span>
      </div>
    </div>
    <Link
      to="/"
      className="inline-block bg-primary text-primary-foreground font-heading font-semibold px-8 py-3 rounded-xl"
    >
      Back to Home
    </Link>
  </motion.div>
);

export default Booking;
