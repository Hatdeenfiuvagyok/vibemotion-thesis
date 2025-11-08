import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MoodCards from "./components/MoodCards";
import AuthModal from "./components/AuthModal";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center pt-10">Vibemotion</h1>

      {/* 🔹 AuthModal — itt jelenik meg a Register/Login gomb */}
      <AuthModal />

      <SearchBar />
      <MoodCards onSelectMood={handleMoodSelect} />

      {showDropdown && playlists.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 p-6 w-full max-w-5xl">
          {playlists.map((p) => (
            <a
              key={p.id}
              href={p.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-700 rounded-xl shadow-lg hover:scale-105 transition-transform bg-gray-800"
            >
              <img
                src={p.images[0]?.url}
                alt={p.name}
                className="rounded-t-xl w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{p.name}</h2>
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
