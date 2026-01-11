import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/**
 * ================================
 * 🎧 Spotify API Token
 * ================================
 */
app.get("/api/token", async (req, res) => {
  try {
    const credentials = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
    const encoded = Buffer.from(credentials).toString("base64");

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: `Basic ${encoded}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("❌ Spotify token error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get Spotify token" });
  }
});

/**
 * ================================
 * 🎵 Search Spotify playlists
 * ================================
 */
app.get("/api/playlists", async (req, res) => {
  const { mood } = req.query;
  if (!mood) return res.status(400).json({ error: "Mood is required" });

  try {
    // Token lekérése
    const tokenRes = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    // Playlist keresés
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${mood}&type=playlist&limit=12`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data.playlists.items);
  } catch (err) {
    console.error("❌ Spotify playlist error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to search playlists" });
  }
});

/**
 * ================================
 * 🚀 Server Start
 * ================================
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`💜 Spotify Backend running at http://localhost:${PORT}`)
);