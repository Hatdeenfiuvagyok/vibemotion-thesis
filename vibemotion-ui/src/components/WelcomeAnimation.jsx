import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function WelcomeAnimation({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000); // 3 másodperc után navigál
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="absolute bottom-0 left-0 h-1 bg-neon-purple w-full"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 3, ease: "easeInOut" }}
    />
  );
}
