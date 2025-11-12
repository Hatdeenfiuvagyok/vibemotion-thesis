import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendWelcomeEmail } from "../Mailer.js"; // Mailer.js-ből
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// ======================================================
// JWT TOKEN GENERATOR
// ======================================================
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ======================================================
// REGISTER
// ======================================================
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !password || !username)
      return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });

    const user = new User({ username, email, password });
    await user.save();

    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ======================================================
// LOGIN
// ======================================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("LOGIN BODY:", req.body);

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    console.log("RAW PASSWORD ENTERED:", password, "LENGTH:", password.length);
    console.log("HASHED PASSWORD IN DB:", user.password, "LENGTH:", user.password.length);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🧩 DEBUG login check:", { entered: password, stored: user.password, isMatch });

    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: err.message });
  }
});

// =========================
// FORGOT PASSWORD
// =========================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No user with this email" });

    // 🔹 Fix 8 karakteres jelszó generálása
    const generatePassword = (length = 8) => {
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let pass = "";
      for (let i = 0; i < length; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return pass;
    };

    const newPassword = generatePassword(8);

    // 🔹 Hash és mentés
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    console.log("DEBUG: newPassword sent via email:", newPassword);
    console.log("DEBUG: saved hash in DB:", user.password);

    // 🔹 Email küldése
    await sendWelcomeEmail(
      email,
      user.username,
      `<p>Your new Vibemotion password is:</p>
       <h3>${newPassword}</h3>
       <p>Please log in and change it as soon as possible.</p>`
    );

    res.json({ message: "New password has been sent to your email." });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ======================================================
// GET CURRENT USER
// ======================================================
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "Missing token" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("❌ /me error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
