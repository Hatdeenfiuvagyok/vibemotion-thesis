import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js"; // ✅ Auth útvonalak

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ============================================================
// 🧱 MongoDB Connection
// ============================================================
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ ERROR: Missing MONGO_URI in .env file!");
  process.exit(1);
}

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ============================================================
// 🧩 Auth Routes (Register / Login / Me)
// ============================================================
app.use("/api/auth", authRoutes);

// ============================================================
// 🎧 Spotify Token Endpoint
// ============================================================
app.get("/api/token", async (req, res) => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "❌ Error fetching token:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to get Spotify token" });
  }
});

// ============================================================
// 🎵 Search playlists by mood or keyword
// ============================================================
app.get("/api/playlists", async (req, res) => {
  const { mood } = req.query;

  try {
    // Token lekérése
    const tokenResponse = await axios.post(
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

    const accessToken = tokenResponse.data.access_token;

    // Playlist keresés
    const searchResponse = await axios.get(
      `https://api.spotify.com/v1/search?q=${mood}&type=playlist&limit=10`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    res.json(searchResponse.data.playlists.items);
  } catch (error) {
    console.error(
      "❌ Error fetching playlists:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

// ============================================================
// 🚀 Server Start
// ============================================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
