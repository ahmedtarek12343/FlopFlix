// Menu items.
import {
  BarChart,
  Crown,
  Heart,
  HistoryIcon,
  PopcornIcon,
  Sparkle,
  Star,
  Search,
  User,
  TrendingUp,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Popular",
    url: "/popular",
    icon: TrendingUp,
  },
  {
    title: "Actors",
    url: "/actors",
    icon: User,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: Heart,
  },
  {
    title: "History",
    url: "/history",
    icon: HistoryIcon,
  },
  {
    title: "Pro",
    url: "/pro",
    icon: Crown,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart,
  },
  {
    title: "Ai Recommendations",
    url: "/ai-recommendations",
    icon: Sparkle,
  },
];
