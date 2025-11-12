import React from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2, delay: 1.5 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-purple-900 to-black text-white z-50"
    >
      <motion.div
        className="w-64 h-1 bg-purple-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
};

export default LoadingScreen;
