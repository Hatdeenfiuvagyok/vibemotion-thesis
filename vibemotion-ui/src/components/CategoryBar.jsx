import React from "react";

const categories = [
  "Joy", "Relax", "Sad", "Study", "Workout", "Romance", "Fun", "Adventure", "Chill"
];

export default function CategoryBar({ selectedCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mt-6 px-4">
      {categories.map((cat, i) => (
        <button
          key={i}
          onClick={() => onSelectCategory(cat)}
          className={`px-4 py-2 rounded-lg font-medium transition
            ${selectedCategory === cat
              ? "bg-black/50 text-white shadow-[0_0_10px_#a855f7]"
              : "bg-black/20 text-gray-300 hover:bg-black/40 hover:shadow-[0_0_5px_#a855f7]"}`}
        >
          {cat}
        </button>
      ))}
      <button
        onClick={() => onSelectCategory(null)}
        className="px-4 py-2 rounded-lg font-medium bg-black/20 text-gray-300 hover:bg-black/40 transition"
      >
        All
      </button>
    </div>
  );
}
