import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MoodCards from "../components/MoodCards";
import AuthModal from "../components/AuthModal";
import axios from "axios";

function App() {
  const [playlists, setPlaylists] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMoodSelect = async (mood) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/playlists?mood=${mood}`);
      const filtered = response.data.filter((p) => p !== null);
      setPlaylists(filtered);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#1a002e] to-[#3b0066] text-white flex flex-col items-center">
      {/* 🔹 Header */}
      <div className="w-full flex justify-between items-center p-8">
        <h1 className="text-4xl font-bold text-neon-glow drop-shadow-[0_0_10px_#a855f7] flex items-center gap-2">
          Vibemotion
        </h1>
        <AuthModal />
      </div>

      {/* 🔹 Search Section */}
      <div className="mt-16 w-full flex flex-col items-center">
        <SearchBar />
      </div>

      {/* 🔹 Mood Cards */}
      <div className="mt-20 w-full flex justify-center px-6">
        <MoodCards onSelectMood={handleMoodSelect} />
      </div>

      {/* 🔹 Results */}
      {showDropdown && playlists.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 p-8 w-full max-w-5xl">
          {playlists.map((p) => (
            <a
              key={p.id}
              href={p.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neon-purple/40 rounded-xl shadow-[0_0_15px_#a855f750] hover:shadow-[0_0_25px_#a855f7] transition-transform bg-[#1a002e]/60 backdrop-blur-sm hover:scale-105"
            >
              <img
                src={p.images[0]?.url}
                alt={p.name}
                className="rounded-t-xl w-full h-48 object-cover opacity-90 hover:opacity-100 transition"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-neon-glow">{p.name}</h2>
                <p className="text-sm text-gray-400 mt-2">{p.description || "No description"}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
