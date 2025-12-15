"use client";

import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-8">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 animate-pulse bg-primary/20 blur-3xl rounded-full" />

        {/* Outer Ring */}
        <motion.div
          className="h-20 w-20 rounded-full border-2 border-primary/20 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Inner Ring */}
        <motion.div
          className="absolute h-12 w-12 rounded-full border-2 border-primary/20 border-b-primary"
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="flex items-center gap-1">
        {"FlopFlix".split("").map((char, index) => (
          <motion.span
            key={index}
            className="text-2xl font-bold tracking-tight text-primary/80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1,
              delay: index * 0.1,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
