import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Settings, CreditCard, HelpCircle, LogOut, ChevronRight, Star, MapPin, Briefcase, Calendar } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Profile = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    
    const fetchData = async () => {
      const [{ data: profileData }, { data: bookingsData }] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).single(),
        supabase.from("bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);
      setProfile(profileData);
      setBookings(bookingsData || []);
    };
    fetchData();
  }, [user]);

  if (!loading && !user) {
    return (
      <AppLayout>
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-sm">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-heading text-xl font-bold mb-2">Sign in to GigGo</h2>
            <p className="text-sm text-muted-foreground mb-6">Access your bookings, saved addresses, and more</p>
            <button
              onClick={() => navigate("/auth")}
              className="bg-primary text-primary-foreground font-heading font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Sign In / Sign Up
            </button>
          </motion.div>
        </div>
      </AppLayout>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const menuItems = [
    { icon: Star, label: "My Reviews", badge: null },
    { icon: MapPin, label: "Saved Addresses", badge: null },
    { icon: CreditCard, label: "Payment Methods", badge: null },
    { icon: Settings, label: "Settings", badge: null },
    { icon: HelpCircle, label: "Help & Support", badge: null },
  ];

  const totalSpent = bookings.reduce((sum, b) => sum + b.price, 0);

  return (
    <AppLayout>
      <header className="bg-primary px-4 pt-8 pb-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-primary-foreground">
                {profile?.display_name || user?.email}
              </h1>
              <p className="text-sm text-primary-foreground/70">{user?.email}</p>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 md:px-6 -mt-3 pb-20 md:pb-10">
        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-4 grid grid-cols-3 gap-4 shadow-sm"
        >
          <div className="text-center">
            <p className="font-heading text-xl font-bold text-primary">{bookings.length}</p>
            <p className="text-xs text-muted-foreground">Bookings</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="font-heading text-xl font-bold text-accent">4.8</p>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-xl font-bold text-success">₹{totalSpent > 1000 ? `${(totalSpent / 1000).toFixed(1)}K` : totalSpent}</p>
            <p className="text-xs text-muted-foreground">Spent</p>
          </div>
        </motion.div>

        {/* Recent Bookings */}
        {bookings.length > 0 && (
          <div className="mt-6">
            <h2 className="font-heading text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" /> Recent Bookings
            </h2>
            <div className="space-y-2">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{booking.gig_title}</p>
                    <p className="text-xs text-muted-foreground">{booking.provider_name} · {new Date(booking.booking_date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })} at {booking.booking_time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">₹{booking.price}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${booking.status === "confirmed" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menu */}
        <div className="mt-6 space-y-1">
          {menuItems.map((item, i) => (
            <motion.button key={item.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-secondary transition-colors group"
            >
              <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
              {item.badge && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md">{item.badge}</span>}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          onClick={handleSignOut}
          className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-destructive text-destructive font-heading font-semibold hover:bg-destructive hover:text-destructive-foreground transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </motion.button>
      </main>
    </AppLayout>
  );
};

export default Profile;
