import React from "react";

const moods = ["Happy", "Chill", "Sad", "Focus", "Energy", "Love"];

function MoodCards({ onSelectMood }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {moods.map((mood, i) => (
        <button
          key={i}
          onClick={() => onSelectMood(mood)}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition"
        >
          {mood}
        </button>
      ))}
    </div>
  );
}

export default MoodCards;
