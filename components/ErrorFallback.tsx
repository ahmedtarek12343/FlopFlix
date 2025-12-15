"use client";

import { Button } from "./ui/button";
import { AlertCircle, MoveLeft, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ErrorFallbackProps {
  refetch: () => void;
}

const ErrorFallback = ({ refetch }: ErrorFallbackProps) => {
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 p-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="relative">
        <div className="absolute inset-0 animate-pulse bg-red-500/20 blur-3xl rounded-full" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
          className="relative flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 ring-1 ring-red-500/20"
        >
          <AlertCircle className="h-12 w-12 text-red-500" />
        </motion.div>
      </div>

      <div className="space-y-2 max-w-[400px]">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          Failed to load content
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground"
        >
          We encountered an unexpected error while trying to retrieve this
          information. Please check your connection and try again.
        </motion.p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center gap-4 items-center"
      >
        <Button
          onClick={refetch}
          size="lg"
          className="gap-2 shadow-lg hover:shadow-primary/25"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
        <Button variant="outline" onClick={() => router.back()}>
          <MoveLeft className="h-4 w-4" />
          Go Back
        </Button>
      </motion.div>
    </div>
  );
};

export default ErrorFallback;
