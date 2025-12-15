"use client";

import GradientText from "../GradientText";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 flex flex-col gap-8 items-start z-10"
          >
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="text-4xl md:text-6xl font-bold"
            >
              About FlopFlix
            </GradientText>

            <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Redefining how you discover entertainment.
            </h3>

            <p className="text-muted-foreground text-xl leading-relaxed">
              FlopFlix isn't just another movie database. It's a curated
              experience designed for true cinema enthusiasts. Whether you're
              looking for the latest blockbuster or a hidden gem, our advanced
              discovery engine helps you find exactly what you're in the mood
              for.
            </p>

            <div className="grid grid-cols-2 gap-8 w-full mt-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-card/50 p-6 rounded-2xl border border-border/50 backdrop-blur-sm transition-colors hover:bg-card/80"
              >
                <h4 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  10K+
                </h4>
                <p className="text-base text-muted-foreground">
                  Movies & Shows
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-card/50 p-6 rounded-2xl border border-border/50 backdrop-blur-sm transition-colors hover:bg-card/80"
              >
                <h4 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  24/7
                </h4>
                <p className="text-base text-muted-foreground">
                  Updated Content
                </p>
              </motion.div>
            </div>

            <Button
              className="mt-6 rounded-full px-10 py-7 text-xl shadow-lg hover:shadow-primary/20 transition-all"
              asChild
            >
              <Link href="/popular">Start Exploring</Link>
            </Button>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:w-1/2 relative h-[500px] w-full rounded-3xl overflow-hidden group perspective-1000"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-secondary/20 z-0 transition-transform duration-700 group-hover:scale-110" />

            {/* Abstract shapes/UI elements representation */}
            <motion.div
              whileHover={{ rotateY: 5, rotateX: 5 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-background/80 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl overflow-hidden transition-all duration-500"
            >
              <div className="absolute -right-24 -top-24 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-50 animate-pulse" />

              <div className="flex flex-col gap-6 relative z-10 h-full justify-center items-center text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  className="w-20 h-20 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-3xl mb-2 shadow-lg shadow-primary/25"
                >
                  🎬
                </motion.div>
                <h4 className="text-2xl font-bold">Smart Recommendations</h4>
                <p className="text-base text-muted-foreground max-w-[80%]">
                  Our AI-powered engine analyzes your taste to provide
                  personalized suggestions that you'll actually enjoy.
                </p>

                <div className="flex -space-x-4 mt-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-background flex items-center justify-center text-sm font-medium shadow-md"
                    >
                      User
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2 font-medium">
                  Join thousands of happy users
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
