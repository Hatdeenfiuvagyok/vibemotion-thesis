// src/components/CategoryBar.jsx
import React, { useMemo } from "react";

const categories = [
  "Joy", "Relax", "Sad", "Study", "Workout", "Romance", "Fun", "Adventure", "Chill"
];

function CategoryBar({ selectedCategory, onSelectCategory }) {
  // Memoizáljuk a gombokat → ne rendereljen újra feleslegesen
  const renderedCategories = useMemo(() => {
    return categories.map((cat, i) => (
      <button
        key={i}
        onClick={() => onSelectCategory(cat)}
        className={`px-4 py-3 rounded-lg font-medium transition
          ${
            selectedCategory === cat
              ? "bg-[#6a00ff]/60 text-white shadow-[0_0_12px_#a855f7] backdrop-blur-sm"
              : "bg-[#6a00ff]/20 text-purple-200 hover:bg-[#6a00ff]/40 hover:shadow-[0_0_8px_#c084fc] backdrop-blur-sm"
          }`}
      >
        {cat}
      </button>
    ));
  }, [selectedCategory, onSelectCategory]);

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-10 mb-16 px-4">
      {renderedCategories}

      {/* ALL BUTTON */}
      <button
        onClick={() => onSelectCategory(null)}
        className="px-4 py-3 rounded-lg font-medium bg-[#6a00ff]/20 text-purple-200 hover:bg-[#6a00ff]/40 hover:shadow-[0_0_8px_#c084fc] backdrop-blur-sm transition"
      >
        All
      </button>
    </div>
  );
}

export default React.memo(CategoryBar);
