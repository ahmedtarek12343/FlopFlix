"use client";
import { PricingTable } from "@clerk/nextjs";
import ProHero from "./ProHero";
import ProFeatures from "./ProFeatures";
import ProFAQ from "./ProFAQ";

const ProComp = () => {
  return (
    <div className="bg-background min-h-screen">
      <ProHero />
      <ProFeatures />

      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          Choose Your Plan
        </h2>
        <div className="flex justify-center">
          <PricingTable
            appearance={{
              variables: {
                colorBackground: "#1a1a1a",
                colorText: "white",
                colorPrimary: "var(--primary)", // Example primary color
              },
              elements: {
                card: "bg-card border border-border/50",
                headerTitle: "text-foreground",
                headerSubtitle: "text-muted-foreground",
                currency: "text-foreground",
                price: "text-foreground",
                featuresListItem: "text-muted-foreground",
              },
            }}
          />
        </div>
      </div>

      <ProFAQ />
    </div>
  );
};

export default ProComp;
