import React, { useState } from "react";
import { motion } from "framer-motion";

function TiltedCard({
  imageSrc,
  altText,
  captionText,
  containerHeight = "200px",
  containerWidth = "200px",
  rotateAmplitude = 10,
  scaleOnHover = 1.1,
  onClick,
}) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * rotateAmplitude; // 🔄 fordított előjel
    const rotateY = ((x - rect.width / 2) / rect.width) * -rotateAmplitude; // opcionálisan inverz, ha jobbra dőlés is fordított

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden shadow-[0_0_25px_#a855f7aa]
                 bg-gradient-to-br from-neon-dark to-black cursor-pointer"
      style={{
        width: containerWidth,
        height: containerHeight,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: isHovered ? scaleOnHover : 1,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Image */}
      <img
        src={imageSrc}
        alt={altText}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

      {/* Caption */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <h2 className="text-white text-xl font-bold drop-shadow-[0_0_10px_#c084fc]">
          {captionText}
        </h2>
      </div>

      {/* Hover glow */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none shadow-[0_0_40px_#a855f7] rounded-2xl"></div>
      )}
    </motion.div>
  );
}

export default TiltedCard;
