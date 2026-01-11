// src/pages/MainPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../components/SideBar";
import MoodCards, { moods } from "../components/MoodCards";
import SearchBar from "../components/SearchBar";
import CategoryBar from "../components/CategoryBar";
import { supabase } from "../supabaseClient"; // kiegészítés

export default function MainPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [username, setUsername] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  // Felhasználó lekérése Supabase session alapján
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data?.session?.user) {
        navigate("/auth");
      } else {
        setUsername(data.session.user.user_metadata?.username || data.session.user.email);
      }
    };
    fetchUser();
  }, [navigate]);

  // Mobil sidebar automatikus bezárása resizekor
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  // Mood kiválasztás → Spotify API lekérdezés
  const handleMoodSelect = async (moodName) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/playlists?mood=${moodName}`
      );
      const filtered = response.data.filter((p) => p !== null);
      setPlaylists(filtered);
    } catch (error) {
      console.error("Spotify playlists fetch error:", error);
    }
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{
        background: "linear-gradient(to bottom, #000000, #1a002e, #3b0066)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Navbar */}
      <div className="w-full flex justify-between items-center p-6 fixed top-0 left-0 z-50
                      bg-black/70 backdrop-blur-md">
        <div className="flex items-center gap-4">
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
        {/* Sidebar */}
        <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <div className="flex-1 md:ml-60 px-4 sm:px-8">
          <SearchBar />

          <CategoryBar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <MoodCards
            selectedCategory={selectedCategory}
            onSelectMood={handleMoodSelect}
          />

          {playlists.length > 0 && (
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
