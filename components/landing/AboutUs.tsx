"use client";

import GradientText from "../GradientText";
import { Button } from "../ui/button";
import Link from "next/link";

const AboutUs = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
          {/* Text Content */}
          <div className="md:w-1/2 flex flex-col gap-6 items-start z-10">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="text-3xl md:text-5xl font-bold"
            >
              About FlopFlix
            </GradientText>

            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Redefining how you discover entertainment.
            </h3>

            <p className="text-muted-foreground text-lg leading-relaxed">
              FlopFlix isn't just another movie database. It's a curated
              experience designed for true cinema enthusiasts. Whether you're
              looking for the latest blockbuster or a hidden gem, our advanced
              discovery engine helps you find exactly what you're in the mood
              for.
            </p>

            <div className="grid grid-cols-2 gap-6 w-full mt-4">
              <div className="bg-card/50 p-4 rounded-xl border border-border/50 backdrop-blur-sm">
                <h4 className="text-2xl font-bold text-primary mb-1">10K+</h4>
                <p className="text-sm text-muted-foreground">Movies & Shows</p>
              </div>
              <div className="bg-card/50 p-4 rounded-xl border border-border/50 backdrop-blur-sm">
                <h4 className="text-2xl font-bold text-primary mb-1">24/7</h4>
                <p className="text-sm text-muted-foreground">Updated Content</p>
              </div>
            </div>

            <Button className="mt-4 rounded-full px-8 py-6 text-lg" asChild>
              <Link href="/popular">Start Exploring</Link>
            </Button>
          </div>

          {/* Visual Content */}
          <div className="md:w-1/2 relative h-[400px] w-full rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-secondary/20 z-0" />

            {/* Abstract shapes/UI elements representation */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-background/80 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-2xl overflow-hidden">
              <div className="absolute -right-20 -top-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl opacity-50" />
              <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-secondary/20 rounded-full blur-3xl opacity-50" />

              <div className="flex flex-col gap-4 relative z-10 h-full justify-center items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl mb-2 shadow-lg shadow-primary/25">
                  🎬
                </div>
                <h4 className="text-xl font-bold">Smart Recommendations</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI-powered engine analyzes your taste to provide
                  personalized suggestions that you'll actually enjoy.
                </p>

                <div className="flex -space-x-3 mt-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-background flex items-center justify-center text-xs"
                    >
                      User
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Join thousands of happy users
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
