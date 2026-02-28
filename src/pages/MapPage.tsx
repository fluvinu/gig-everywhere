import MapView from "@/components/MapView";
import BottomNav from "@/components/BottomNav";
import { gigs } from "@/data/gigs";
import { motion } from "framer-motion";
import { List, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const MapPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <h1 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Nearby Services
          </h1>
          <Link
            to="/explore"
            className="flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-2.5 py-1.5 rounded-lg"
          >
            <List className="w-3 h-3" /> List View
          </Link>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <MapView height="h-[calc(100vh-160px)]" />
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
};

export default MapPage;
