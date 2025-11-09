import React from "react";
import { motion } from "framer-motion";

const moods = [
  {
    name: "Happy",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600",
  },
  {
    name: "Chill",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
  },
  {
    name: "Sad",
    image: "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?w=600",
  },
  {
    name: "Focus",
    image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=600",
  },
  {
    name: "Energy",
    image: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=600",
  },
  {
    name: "Love",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
  },
];

function MoodCards({ onSelectMood }) {
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-12">
      {moods.map((mood, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.07, rotateX: 4, rotateY: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative w-48 h-48 rounded-2xl cursor-pointer 
                     overflow-hidden shadow-[0_0_20px_#a855f7aa] 
                     hover:shadow-[0_0_40px_#c084fc] 
                     bg-gradient-to-br from-neon-purple to-neon-dark"
          onClick={() => onSelectMood(mood.name)}
        >
          <img
            src={mood.image}
            alt={mood.name}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <h2 className="text-white text-2xl font-bold drop-shadow-lg">
              {mood.name}
            </h2>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default MoodCards;
