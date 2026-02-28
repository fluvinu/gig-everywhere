import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import GigCard from "@/components/GigCard";
import AppLayout from "@/components/AppLayout";
import MapView from "@/components/MapView";
import { categories, gigs } from "@/data/gigs";
import { useSearchParams } from "react-router-dom";

const Explore = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState<string | null>(selectedCategory);

  const filteredGigs = activeCategory
    ? gigs.filter((g) => g.category === activeCategory)
    : gigs;

  return (
    <AppLayout>
      {/* Header */}
      <header className="md:hidden sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/50">
        <div className="px-4 py-3 max-w-lg mx-auto">
          <h1 className="font-heading text-lg font-bold text-foreground mb-3">Explore Services</h1>
          <SearchBar />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 mt-4 pb-20 md:pb-10">
        {/* Desktop Search */}
        <div className="hidden md:block max-w-xl mb-6">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Explore Services</h1>
          <SearchBar />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              !activeCategory
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1 ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mt-2 mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredGigs.length}</span> services found
          </p>
          <button className="flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-2.5 py-1.5 rounded-lg">
            <SlidersHorizontal className="w-3 h-3" /> Filters
          </button>
        </div>

        {/* Desktop: Two-column with map */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredGigs.map((gig, i) => (
                <GigCard key={gig.id} gig={gig} index={i} />
              ))}
            </div>

            {filteredGigs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-heading font-semibold text-foreground">No services found</p>
                <p className="text-sm text-muted-foreground mt-1">Try a different category or search term</p>
              </div>
            )}
          </div>

          {/* Desktop Map */}
          <div className="hidden lg:block w-[400px] flex-shrink-0">
            <div className="sticky top-24">
              <MapView filteredGigs={filteredGigs} height="h-[600px]" />
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default Explore;
