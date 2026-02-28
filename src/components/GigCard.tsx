import { motion } from "framer-motion";
import { Star, MapPin, Clock, BadgeCheck } from "lucide-react";
import { Gig } from "@/data/gigs";
import { Link } from "react-router-dom";

interface GigCardProps {
  gig: Gig;
  index?: number;
}

const GigCard = ({ gig, index = 0 }: GigCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link to={`/gig/${gig.id}`} className="block">
        <div className="bg-card rounded-2xl border border-border p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
          {/* Category & Tags */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-lg">
              {gig.categoryIcon} {gig.category}
            </span>
            {gig.featured && (
              <span className="text-xs font-semibold bg-accent/15 text-accent px-2 py-0.5 rounded-md">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {gig.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {gig.description}
          </p>

          {/* Provider */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              {gig.provider.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium truncate">{gig.provider.name}</span>
                {gig.provider.verified && (
                  <BadgeCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-accent fill-accent" />
                <span className="text-xs text-muted-foreground">
                  {gig.provider.rating} ({gig.provider.reviewCount})
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {gig.distance}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {gig.duration}
              </span>
            </div>
            <div className="text-right">
              <span className="font-heading text-lg font-bold text-primary">₹{gig.price}</span>
              <span className="text-[10px] text-muted-foreground block">{gig.priceUnit}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GigCard;
