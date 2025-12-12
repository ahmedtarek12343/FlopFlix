"use client";
import { motion } from "motion/react";
import { Sparkles, BarChart2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const UpgradeToPremium = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-background/50 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-1/2 -left-1/4 w-3/4 h-3/4 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/4 w-3/4 h-3/4 bg-purple-500/10 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-sm font-semibold text-primary tracking-wider uppercase mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Premium Feature
              </h2>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
                Unlock Advanced Analytics
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Gain deep insights into your viewing habits. Track your top
                genres, monitor your watching streaks, and get personalized
                recommendations based on your history.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href="/pro">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                  Upgrade to Pro <Zap className="w-4 h-4 ml-2 fill-current" />
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-lg"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="relative z-10 bg-card/50 border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-md transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <BarChart2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Viewing Insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Weekly Analysis
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 bg-white/10 rounded-full w-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
                <div className="h-2 bg-white/10 rounded-full w-2/3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ delay: 1, duration: 1 }}
                    className="h-full bg-purple-500 rounded-full"
                  />
                </div>
                <div className="h-2 bg-white/10 rounded-full w-4/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-between items-end">
                <div className="text-3xl font-bold">+124%</div>
                <div className="text-sm text-green-400">vs last month</div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default UpgradeToPremium;
