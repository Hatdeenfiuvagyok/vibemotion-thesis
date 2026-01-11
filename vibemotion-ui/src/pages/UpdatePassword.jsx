import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("access_token");
    const type = params.get("type");

    if (!token || type !== "recovery") {
      setError("Invalid or expired password reset link.");
      return;
    }

    setAccessToken(token);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");

    try {
      if (!accessToken) throw new Error("Missing access token.");

      const { error } = await supabase.auth.updateUser(
        { password },
        { accessToken }
      );

      if (error) throw error;

      setInfo("Password updated successfully! Redirecting to login...");
      setTimeout(() => navigate("/auth"), 2000);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#2a0a4a] to-[#100018] text-white px-4">
      <h2 className="text-3xl font-bold mb-4 text-center">Set a New Password</h2>
      {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
      {accessToken && !error && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-sm bg-[#1b002b] p-6 rounded-xl shadow-lg"
        >
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-[#160022aa] text-white border border-[#a855f755] focus:outline-none"
            required
          />
          {info && <p className="text-green-400 text-center">{info}</p>}
          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-neon-purple rounded-xl hover:scale-105 transition text-white font-semibold"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </div>
  );
}
