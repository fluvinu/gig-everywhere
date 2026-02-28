export interface GigProvider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  completedGigs: number;
}

export interface Gig {
  id: string;
  title: string;
  category: string;
  categoryIcon: string;
  description: string;
  price: number;
  priceUnit: string;
  provider: GigProvider;
  images: string[];
  lat: number;
  lng: number;
  distance: string;
  duration: string;
  tags: string[];
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  gigCount: number;
}

export const categories: Category[] = [
  { id: "cleaning", name: "Cleaning", icon: "🧹", color: "bg-primary/10 text-primary", gigCount: 245 },
  { id: "plumbing", name: "Plumbing", icon: "🔧", color: "bg-accent/10 text-accent", gigCount: 128 },
  { id: "electrical", name: "Electrical", icon: "⚡", color: "bg-accent/10 text-accent", gigCount: 96 },
  { id: "tutoring", name: "Tutoring", icon: "📚", color: "bg-primary/10 text-primary", gigCount: 312 },
  { id: "design", name: "Design", icon: "🎨", color: "bg-accent/10 text-accent", gigCount: 189 },
  { id: "photography", name: "Photo", icon: "📸", color: "bg-primary/10 text-primary", gigCount: 156 },
  { id: "fitness", name: "Fitness", icon: "💪", color: "bg-accent/10 text-accent", gigCount: 203 },
  { id: "cooking", name: "Cooking", icon: "👨‍🍳", color: "bg-primary/10 text-primary", gigCount: 87 },
  { id: "beauty", name: "Beauty", icon: "💅", color: "bg-accent/10 text-accent", gigCount: 178 },
  { id: "moving", name: "Moving", icon: "📦", color: "bg-primary/10 text-primary", gigCount: 64 },
  { id: "tech", name: "Tech Help", icon: "💻", color: "bg-accent/10 text-accent", gigCount: 221 },
  { id: "gardening", name: "Garden", icon: "🌱", color: "bg-primary/10 text-primary", gigCount: 92 },
];

export const gigs: Gig[] = [
  {
    id: "1",
    title: "Deep Home Cleaning",
    category: "cleaning",
    categoryIcon: "🧹",
    description: "Professional deep cleaning service for your entire home. Includes kitchen, bathrooms, bedrooms, and living areas. We use eco-friendly products.",
    price: 1499,
    priceUnit: "per session",
    provider: {
      id: "p1", name: "Priya Sharma", avatar: "PS",
      rating: 4.9, reviewCount: 234, verified: true, completedGigs: 567,
    },
    images: [], lat: 28.6139, lng: 77.209, distance: "1.2 km",
    duration: "3-4 hrs", tags: ["Eco-friendly", "Top Rated"], featured: true,
  },
  {
    id: "2",
    title: "Plumbing Repair & Installation",
    category: "plumbing",
    categoryIcon: "🔧",
    description: "Expert plumbing services including leak repair, pipe installation, fixture replacement, and drain cleaning. Quick and reliable.",
    price: 799,
    priceUnit: "per visit",
    provider: {
      id: "p2", name: "Rajesh Kumar", avatar: "RK",
      rating: 4.7, reviewCount: 189, verified: true, completedGigs: 423,
    },
    images: [], lat: 28.6229, lng: 77.215, distance: "2.5 km",
    duration: "1-2 hrs", tags: ["Quick Service", "Guaranteed"], featured: true,
  },
  {
    id: "3",
    title: "Math & Science Tutoring",
    category: "tutoring",
    categoryIcon: "📚",
    description: "Personalized tutoring for students from grade 6-12. Specializing in mathematics, physics, and chemistry with proven results.",
    price: 599,
    priceUnit: "per hour",
    provider: {
      id: "p3", name: "Anita Desai", avatar: "AD",
      rating: 4.95, reviewCount: 412, verified: true, completedGigs: 890,
    },
    images: [], lat: 28.6099, lng: 77.205, distance: "0.8 km",
    duration: "1 hr", tags: ["Top Tutor", "Online Available"], featured: true,
  },
  {
    id: "4",
    title: "Personal Fitness Training",
    category: "fitness",
    categoryIcon: "💪",
    description: "Customized workout plans and one-on-one training sessions. Whether you want to lose weight, build muscle, or improve flexibility.",
    price: 999,
    priceUnit: "per session",
    provider: {
      id: "p4", name: "Vikram Singh", avatar: "VS",
      rating: 4.8, reviewCount: 156, verified: true, completedGigs: 345,
    },
    images: [], lat: 28.6189, lng: 77.220, distance: "3.1 km",
    duration: "1 hr", tags: ["Certified", "Home Visit"], featured: false,
  },
  {
    id: "5",
    title: "Logo & Brand Design",
    category: "design",
    categoryIcon: "🎨",
    description: "Creative logo design and complete brand identity packages. Get a unique, professional look for your business or personal brand.",
    price: 2999,
    priceUnit: "per project",
    provider: {
      id: "p5", name: "Meera Patel", avatar: "MP",
      rating: 4.85, reviewCount: 278, verified: true, completedGigs: 612,
    },
    images: [], lat: 28.6159, lng: 77.212, distance: "1.8 km",
    duration: "3-5 days", tags: ["Portfolio Available", "Rush Available"], featured: true,
  },
  {
    id: "6",
    title: "Event Photography",
    category: "photography",
    categoryIcon: "📸",
    description: "Professional photography for weddings, birthdays, corporate events, and more. High-quality edited photos delivered within a week.",
    price: 4999,
    priceUnit: "per event",
    provider: {
      id: "p6", name: "Arjun Nair", avatar: "AN",
      rating: 4.9, reviewCount: 198, verified: true, completedGigs: 289,
    },
    images: [], lat: 28.6109, lng: 77.218, distance: "2.0 km",
    duration: "4-8 hrs", tags: ["Award Winning", "Drone Available"], featured: false,
  },
  {
    id: "7",
    title: "Home Cook / Chef Service",
    category: "cooking",
    categoryIcon: "👨‍🍳",
    description: "Hire a professional cook for daily meals, parties, or special occasions. Multi-cuisine expertise including North Indian, South Indian, and Continental.",
    price: 1299,
    priceUnit: "per day",
    provider: {
      id: "p7", name: "Sunita Devi", avatar: "SD",
      rating: 4.75, reviewCount: 167, verified: true, completedGigs: 456,
    },
    images: [], lat: 28.6169, lng: 77.207, distance: "1.5 km",
    duration: "Full day", tags: ["Multi-cuisine", "Party Catering"], featured: false,
  },
  {
    id: "8",
    title: "Electrical Repair & Wiring",
    category: "electrical",
    categoryIcon: "⚡",
    description: "Licensed electrician for all electrical needs. Wiring, switch installation, fan repair, inverter setup, and safety inspections.",
    price: 699,
    priceUnit: "per visit",
    provider: {
      id: "p8", name: "Mohammed Ali", avatar: "MA",
      rating: 4.65, reviewCount: 145, verified: true, completedGigs: 378,
    },
    images: [], lat: 28.6209, lng: 77.213, distance: "2.8 km",
    duration: "1-3 hrs", tags: ["Licensed", "Emergency Available"], featured: false,
  },
];
