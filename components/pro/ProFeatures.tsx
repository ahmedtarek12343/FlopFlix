"use client";

import { Check, Shield, Zap, Film, Download, Tv } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Ad-Free Streaming",
    description:
      "Enjoy your favorite movies and shows without any interruptions.",
  },
  {
    icon: <Film className="w-6 h-6 text-primary" />,
    title: "4K Ultra HD",
    description:
      "Experience cinema-quality visuals with crystal clear 4K resolution.",
  },
  {
    icon: <Download className="w-6 h-6 text-primary" />,
    title: "Offline Downloads",
    description:
      "Download content to watch anywhere, anytime, even without internet.",
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Early Access",
    description: "Get access to new releases 24 hours before everyone else.",
  },
  {
    icon: <Tv className="w-6 h-6 text-primary" />,
    title: "Multi-Device Support",
    description: "Stream on up to 4 devices simultaneously with one account.",
  },
  {
    icon: <Check className="w-6 h-6 text-primary" />,
    title: "Priority Support",
    description: "Get 24/7 dedicated support for any issues you encounter.",
  },
];

const ProFeatures = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProFeatures;
