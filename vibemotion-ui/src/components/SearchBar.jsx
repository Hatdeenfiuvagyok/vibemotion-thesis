// src/components/SearchBar.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import debounce from "lodash.debounce";

function SearchBar({ cachedPlaylists }) {
  const [mood, setMood] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  const fetchPlaylists = useCallback(
    async (value) => {
      if (!value.trim()) {
        setPlaylists([]);
        setShowDropdown(false);
        return;
      }

      if (cachedPlaylists.current[value]) {
        setPlaylists(cachedPlaylists.current[value]);
        setShowDropdown(true);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/playlists?mood=${value}`
        );
        const filtered = response.data.filter((p) => p !== null);
        cachedPlaylists.current[value] = filtered;
        setPlaylists(filtered);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    },
    [cachedPlaylists]
  );

  const debouncedFetch = useCallback(debounce(fetchPlaylists, 300), [fetchPlaylists]);

  const handleChange = (e) => {
    setMood(e.target.value);
    debouncedFetch(e.target.value);
  };

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
    <div ref={containerRef} className="relative w-full max-w-md mx-auto mt-10">
      <div className="relative">
        <input
          type="text"
          placeholder="Enter a mood (happy, chill, sad...)"
          value={mood}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-neon-purple/40 bg-neon-dark/60 
                     text-white focus:outline-none focus:ring-2 focus:ring-neon-purple
                     placeholder-gray-400 shadow-[0_0_10px_#a855f755] transition-all duration-300"
        />
        <div className="absolute right-3 top-3 text-neon-glow">🎵</div>
      </div>

      <AnimatePresence>
        {showDropdown && playlists.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-2 bg-gradient-to-br from-neon-dark to-black/90 
                       border border-neon-purple/40 rounded-xl shadow-[0_0_20px_#a855f755]
                       max-h-80 overflow-y-auto z-50 backdrop-blur-sm"
          >
            {playlists.map((p) => (
              <a
                key={p.id}
                href={p.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 hover:bg-neon-purple/20 transition-all duration-200"
              >
                <img
                  src={p.images[0]?.url}
                  alt={p.name}
                  className="w-12 h-12 object-cover rounded-md border border-neon-purple/40"
                />
                <div>
                  <h3 className="font-semibold text-neon-glow drop-shadow-sm">{p.name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-1">{p.description || "No description"}</p>
                </div>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;
