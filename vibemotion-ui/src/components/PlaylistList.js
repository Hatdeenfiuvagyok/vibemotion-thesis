import React from "react";

const moods = ["Happy", "Chill", "Sad", "Focus", "Energy", "Love"];

function MoodCards({ onSelectMood }) {
  return (
    <div className="flex flex-wrap justify-center gap-5 mt-10">
      {moods.map((mood, i) => (
        <button
          key={i}
          onClick={() => onSelectMood(mood)}
          className="px-6 py-3 text-lg font-semibold text-white rounded-xl 
                     bg-gradient-to-br from-neon-purple to-neon-dark 
                     shadow-[0_0_15px_#a855f7]
                     hover:shadow-[0_0_30px_#a855f7] 
                     hover:scale-105 hover:from-neon-glow hover:to-neon-purple 
                     transition-all duration-300"
        >
          {mood}
        </button>
      ))}
    </div>
  );
}

export default MoodCards;
