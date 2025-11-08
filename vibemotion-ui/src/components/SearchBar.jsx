import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function SearchBar() {
  const [mood, setMood] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  // API hívás a kereséshez
  const handleSearch = async (value) => {
    setMood(value);
    if (value.trim() === "") {
      setPlaylists([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/playlists?mood=${value}`);
      const filtered = response.data.filter((p) => p !== null);
      setPlaylists(filtered);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  // bezárás ha rákattintunk máshova
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto mt-8">
      <input
        type="text"
        placeholder="Enter a mood (happy, chill, sad...)"
        value={mood}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-green-500"
      />

      {showDropdown && playlists.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
          {playlists.map((p) => (
            <a
              key={p.id}
              href={p.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 hover:bg-gray-800 transition"
            >
              <img
                src={p.images[0]?.url}
                alt={p.name}
                className="w-12 h-12 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold text-white">{p.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-1">
                  {p.description || "No description"}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
