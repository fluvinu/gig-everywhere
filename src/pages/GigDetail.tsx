import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, MapPin, Clock, BadgeCheck, Shield, Share2, Heart, MessageCircle } from "lucide-react";
import { gigs } from "@/data/gigs";
import BottomNav from "@/components/BottomNav";

const GigDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const gig = gigs.find((g) => g.id === id);

  if (!gig) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-3">😕</p>
          <p className="font-heading font-semibold">Gig not found</p>
          <Link to="/" className="text-primary text-sm mt-2 inline-block">Go Home</Link>
        </div>
      </div>
    );
  }

  const reviews = [
    { name: "Rahul M.", rating: 5, text: "Excellent service! Very professional and completed on time.", time: "2 days ago" },
    { name: "Sneha K.", rating: 4, text: "Good work overall. Would recommend to others.", time: "1 week ago" },
    { name: "Amit P.", rating: 5, text: "Best in the area. Will definitely book again!", time: "2 weeks ago" },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-secondary hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl bg-secondary hover:bg-muted transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl bg-secondary hover:bg-muted transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Category Badge */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-lg">
              {gig.categoryIcon} {gig.category}
            </span>
            {gig.featured && (
              <span className="text-xs font-semibold bg-accent/15 text-accent px-2 py-0.5 rounded-md">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* Title & Tags */}
          <h1 className="font-heading text-2xl font-bold text-foreground mt-3">{gig.title}</h1>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {gig.tags.map((tag) => (
              <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-accent fill-accent" /> {gig.provider.rating}</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {gig.distance}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {gig.duration}</span>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="font-heading text-sm font-bold text-foreground mb-2">About This Service</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{gig.description}</p>
          </div>

          {/* Provider Card */}
          <div className="mt-6 bg-card border border-border rounded-2xl p-4">
            <h2 className="font-heading text-sm font-bold text-foreground mb-3">Service Provider</h2>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                {gig.provider.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{gig.provider.name}</span>
                  {gig.provider.verified && <BadgeCheck className="w-4 h-4 text-primary" />}
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-accent fill-accent" /> {gig.provider.rating} ({gig.provider.reviewCount})</span>
                  <span>{gig.provider.completedGigs} gigs done</span>
                </div>
              </div>
              <button className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-success/10 rounded-xl p-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-success" />
              <div>
                <p className="text-xs font-semibold text-foreground">Verified</p>
                <p className="text-[10px] text-muted-foreground">Background checked</p>
              </div>
            </div>
            <div className="bg-accent/10 rounded-xl p-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs font-semibold text-foreground">Top Rated</p>
                <p className="text-[10px] text-muted-foreground">{gig.provider.rating}+ avg rating</p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-6">
            <h2 className="font-heading text-sm font-bold text-foreground mb-3">
              Reviews ({gig.provider.reviewCount})
            </h2>
            <div className="space-y-3">
              {reviews.map((review, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{review.name}</span>
                    <span className="text-xs text-muted-foreground">{review.time}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-1">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Sticky Book Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-card/95 backdrop-blur-lg border-t border-border px-4 py-3">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div>
            <span className="font-heading text-2xl font-bold text-primary">₹{gig.price}</span>
            <span className="text-xs text-muted-foreground ml-1">{gig.priceUnit}</span>
          </div>
          <Link
            to={`/booking/${gig.id}`}
            className="bg-primary text-primary-foreground font-heading font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity active:scale-95 transform"
          >
            Book Now
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default GigDetail;
