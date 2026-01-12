// src/components/WelcomeAnimation.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";

const WelcomeAnimation = React.memo(({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000); // 3 másodperc

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
});

export default WelcomeAnimation;
