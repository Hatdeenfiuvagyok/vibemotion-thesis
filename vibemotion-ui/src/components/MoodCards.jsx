import React from "react";

const moods = [
  {
    name: "Happy",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
  },
  {
    name: "Chill",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  },
  {
    name: "Sad",
    image: "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?w=800",
  },
  {
    name: "Focus",
    image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=800",
  },
  {
    name: "Energy",
    image: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=800",
  },
  {
    name: "Love",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  },
];

function MoodCards({ onSelectMood }) {
  // ez kezeli az egérmozgást és 3D döntést
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // ha lent az egér, hátradől
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`;
  };

  const resetTilt = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    <div className="flex flex-wrap justify-center gap-10 mt-16 px-6">
      {moods.map((mood, i) => (
        <div
          key={i}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          onClick={() => onSelectMood(mood.name)}
          className="relative w-52 h-80 rounded-2xl cursor-pointer overflow-hidden
                     shadow-[0_0_25px_#a855f7aa] hover:shadow-[0_0_50px_#c084fc]
                     bg-gradient-to-br from-neon-purple to-neon-dark 
                     transition-transform duration-150 ease-out"
        >
          <img
            src={mood.image}
            alt={mood.name}
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <h2 className="text-white text-2xl font-bold drop-shadow-lg tracking-wide">
              {mood.name}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MoodCards;
