import { motion } from "framer-motion";
import { MapPin, Bell, ChevronRight, TrendingUp } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import GigCard from "@/components/GigCard";
import BottomNav from "@/components/BottomNav";
import { categories, gigs } from "@/data/gigs";
import heroBanner from "@/assets/hero-banner.jpg";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredGigs = gigs.filter((g) => g.featured);
  const popularGigs = gigs.slice(0, 4);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <div>
            <h1 className="font-heading text-xl font-bold text-foreground">
              Gig<span className="text-primary">Go</span>
            </h1>
            <button className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5 hover:text-foreground transition-colors">
              <MapPin className="w-3 h-3" />
              New Delhi, India
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <button className="relative p-2 rounded-xl bg-secondary hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 rounded-2xl overflow-hidden relative"
        >
          <img
            src={heroBanner}
            alt="Book any service near you"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex items-center px-5">
            <div>
              <h2 className="font-heading text-xl font-bold text-primary-foreground leading-tight">
                Book Any Service,<br />Anytime, Anywhere
              </h2>
              <p className="text-primary-foreground/80 text-xs mt-1">
                1000+ verified providers near you
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <div className="mt-4">
          <SearchBar />
        </div>

        {/* Categories */}
        <section className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-base font-bold text-foreground">Categories</h2>
            <Link to="/explore" className="text-xs text-primary font-medium hover:underline">
              See All
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {categories.slice(0, 8).map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </div>
        </section>

        {/* Featured Gigs */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-base font-bold text-foreground flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-accent" />
              Featured Gigs
            </h2>
            <Link to="/explore" className="text-xs text-primary font-medium hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {featuredGigs.map((gig, i) => (
              <GigCard key={gig.id} gig={gig} index={i} />
            ))}
          </div>
        </section>

        {/* Popular Near You */}
        <section className="mt-8 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading text-base font-bold text-foreground">Popular Near You</h2>
          </div>
          <div className="space-y-3">
            {popularGigs.map((gig, i) => (
              <GigCard key={gig.id} gig={gig} index={i} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
