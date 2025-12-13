"use client";
import { useTransitionStore } from "@/store/transition.store";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function ExpandingOverlay() {
  const { expandingCard, clearExpandingCard } = useTransitionStore();

  return (
    <AnimatePresence>
      {expandingCard && (
        <motion.div
          initial={{
            position: "fixed",
            top: expandingCard.initialPosition.top,
            left: expandingCard.initialPosition.left,
            width: expandingCard.initialPosition.width,
            height: expandingCard.initialPosition.height,
            borderRadius: "0.5rem",
          }}
          animate={{
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            borderRadius: "0rem",
          }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "circIn" } }}
          transition={{ duration: 0.8, ease: "circIn" }}
          className="z-[100] overflow-hidden bg-black"
          onAnimationComplete={clearExpandingCard}
        >
          <Image
            src={expandingCard.src}
            alt="Expanding"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
