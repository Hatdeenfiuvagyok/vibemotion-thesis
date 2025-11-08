import React, { useState } from "react";
import axios from "axios";

function PlaylistList() {
  const [mood, setMood] = useState("");
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/playlists?mood=${mood}`);
      const filtered = response.data.filter(p => p !== null);
      setPlaylists(filtered);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Find playlists by mood 🎧</h1>

      <input
        type="text"
        placeholder="Enter a mood (happy, chill, sad...)"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="border p-2 rounded-md w-64"
      />
      <button
        onClick={fetchPlaylists}
        className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {playlists.map((p) => (
          <a
            key={p.id}
            href={p.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded-xl shadow-lg hover:scale-105 transition-transform p-4 bg-white"
          >
            <img
              src={p.images[0]?.url}
              alt={p.name}
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-sm text-gray-600 mt-2">{p.description || "No description"}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default PlaylistList;
