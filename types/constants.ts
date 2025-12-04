// Menu items.
import {
  BarChart,
  Crown,
  Heart,
  HistoryIcon,
  Home,
  PopcornIcon,
  Sparkle,
  Star,
  Search,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Popular",
    url: "/popular",
    icon: Home,
  },
  {
    title: "Top Rated",
    url: "/top-rated",
    icon: Star,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Watchlist",
    url: "/watchlist",
    icon: PopcornIcon,
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
