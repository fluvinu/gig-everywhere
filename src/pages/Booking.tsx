import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MapPin, Check, BadgeCheck } from "lucide-react";
import { gigs } from "@/data/gigs";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { toast } from "sonner";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
];

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const gig = gigs.find((g) => g.id === id);

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  if (!gig) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-heading font-semibold">Gig not found</p>
      </div>
    );
  }

  // Generate next 7 days
  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const handleConfirm = () => {
    if (!selectedDate && selectedDate !== 0) {
      toast.error("Please select a date");
      return;
    }
    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }
    if (!address.trim()) {
      toast.error("Please enter your address");
      return;
    }
    setConfirmed(true);
    toast.success("Booking confirmed! 🎉");
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-sm text-muted-foreground mb-6">
            {gig.provider.name} will arrive on{" "}
            {dates[selectedDate!].toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" })}{" "}
            at {selectedTime}
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
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-secondary hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading text-lg font-bold text-foreground">Book Service</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 mt-4">
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
          <div className="grid grid-cols-3 gap-2">
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
        </motion.div>
      </main>

      {/* Confirm Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border px-4 py-3">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleConfirm}
            className="w-full bg-primary text-primary-foreground font-heading font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity active:scale-[0.98] transform"
          >
            Confirm Booking — ₹{gig.price}
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Booking;
