import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MoodCards from "../components/MoodCards";
import axios from "axios";
import SideBar from "../components/SideBar";

export default function MainPage() {
  const [playlists, setPlaylists] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Bezárjuk a mobil sidebar-t, ha felnagyítják az ablakot desktop/tablet méretre
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint Tailwind szerint
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("vibemotion_token");
    if (!token) navigate("/auth");
    else {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUsername(res.data.user.username))
        .catch(() => {
          localStorage.removeItem("vibemotion_token");
          navigate("/auth");
        });
    }
  }, [navigate]);

  const handleMoodSelect = async (mood) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/playlists?mood=${mood}`
      );
      const filtered = response.data.filter((p) => p !== null);
      setPlaylists(filtered);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("vibemotion_token");
    setUsername(null);
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#1a002e] to-[#3b0066] text-white flex flex-col">
      {/* Navbar */}
      <div className="w-full flex justify-between items-center p-6 fixed top-0 left-0 z-50
                      bg-black/70 backdrop-blur-md">
        <div className="flex items-center gap-4">
          {/* Hamburger mobilon */}
          <button
            className="text-white text-2xl md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            &#9776;
          </button>

          <h1 className="text-3xl font-bold text-neon-glow drop-shadow-[0_0_10px_#a855f7]">
            Vibemotion
          </h1>
        </div>

        {username && (
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">{username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-neon-purple/80 hover:bg-neon-purple rounded-lg text-sm transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="flex pt-24">
        {/* Sidebar minden eszközre */}
        <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Desktop padding-left a sidebar szélességhez */}
        <div className="flex-1 md:ml-60 px-8">
          {/* Search */}
          <div className="mt-6 flex flex-col items-center">
            <SearchBar />
          </div>

          {/* Mood Cards */}
          <div className="mt-12 flex justify-center w-full px-6">
            <MoodCards onSelectMood={handleMoodSelect} />
          </div>

          {/* Playlist results */}
          {showDropdown && playlists.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 p-8 w-full max-w-5xl mx-auto">
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
                    <p className="text-sm text-gray-400 mt-2">
                      {p.description || "No description"}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
