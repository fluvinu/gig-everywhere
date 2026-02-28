import { motion } from "framer-motion";
import { User, Settings, CreditCard, HelpCircle, LogOut, ChevronRight, Star, MapPin, Briefcase } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Profile = () => {
  const menuItems = [
    { icon: Briefcase, label: "My Bookings", badge: "3 active" },
    { icon: Star, label: "My Reviews", badge: null },
    { icon: MapPin, label: "Saved Addresses", badge: null },
    { icon: CreditCard, label: "Payment Methods", badge: null },
    { icon: Settings, label: "Settings", badge: null },
    { icon: HelpCircle, label: "Help & Support", badge: null },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary px-4 pt-8 pb-6">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-primary-foreground">Guest User</h1>
              <p className="text-sm text-primary-foreground/70">Sign in to access all features</p>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 -mt-3">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-4 grid grid-cols-3 gap-4 shadow-sm"
        >
          <div className="text-center">
            <p className="font-heading text-xl font-bold text-primary">12</p>
            <p className="text-xs text-muted-foreground">Bookings</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="font-heading text-xl font-bold text-accent">4.8</p>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-xl font-bold text-success">₹8.5K</p>
            <p className="text-xs text-muted-foreground">Spent</p>
          </div>
        </motion.div>

        {/* Menu */}
        <div className="mt-6 space-y-1">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-secondary transition-colors group"
            >
              <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
              {item.badge && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md">{item.badge}</span>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        {/* Sign In / Logout */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-primary text-primary font-heading font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign In
        </motion.button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
