"use client";

import GradientText from "../GradientText";
import { Badge } from "../ui/badge";

const ProHero = () => {
  return (
    <div className="relative py-20 text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center gap-6">
        <Badge
          variant="outline"
          className="text-sm py-1 px-3 border-primary/50 text-primary uppercase tracking-wider bg-primary/10 backdrop-blur-md"
        >
          Premium Access
        </Badge>

        <GradientText
          colors={["#FFD700", "#FFA500", "#FFD700", "#FFA500", "#FFD700"]}
          animationSpeed={4}
          showBorder={false}
          className="text-5xl p-4 rounded-none md:text-7xl font-bold tracking-tight"
        >
          Upgrade to Pro
        </GradientText>

        <h2 className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed">
          Unlock the full potential of FlopFlix.{" "}
          <br className="hidden md:block" />
          Enjoy{" "}
          <span className="text-foreground font-semibold">
            4K streaming
          </span>,{" "}
          <span className="text-foreground font-semibold">
            offline downloads
          </span>
          , and an exclusive{" "}
          <span className="text-foreground font-semibold">
            ad-free experience
          </span>
          .
        </h2>
      </div>
    </div>
  );
};

export default ProHero;
