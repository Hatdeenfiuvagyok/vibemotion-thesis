import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function WelcomeAnimation({ username, onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500); // 2.5 másodperc
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#2a0a4a] to-[#100018] z-50 text-white">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold drop-shadow-[0_0_20px_#a855f7]"
      >
        Welcome back, {username}!
      </motion.h1>
    </div>
  );
}
