import MapView from "@/components/MapView";
import AppLayout from "@/components/AppLayout";
import { motion } from "framer-motion";
import { List, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const MapPage = () => {
  return (
    <AppLayout>
      <header className="md:hidden sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/50">
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

      <main className="max-w-6xl mx-auto px-4 md:px-6 mt-4 pb-20 md:pb-10">
        <div className="hidden md:flex items-center justify-between mb-4">
          <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" /> Nearby Services
          </h1>
          <Link
            to="/explore"
            className="flex items-center gap-1 text-sm text-primary font-medium bg-primary/10 px-3 py-2 rounded-lg"
          >
            <List className="w-4 h-4" /> List View
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <MapView height="h-[calc(100vh-160px)] md:h-[calc(100vh-140px)]" />
        </motion.div>
      </main>
    </AppLayout>
  );
};

export default MapPage;
