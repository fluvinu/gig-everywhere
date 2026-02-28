import { motion } from "framer-motion";
import { Category } from "@/data/gigs";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        to={`/explore?category=${category.id}`}
        className="flex flex-col items-center gap-2 group"
      >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${category.color} transition-all duration-200 group-hover:scale-110 group-hover:shadow-md`}>
          {category.icon}
        </div>
        <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors">
          {category.name}
        </span>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
