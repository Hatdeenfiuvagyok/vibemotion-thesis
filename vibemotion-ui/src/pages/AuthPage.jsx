import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/clipShapes.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("vibemotion_token");
    if (token) {
      fetchMe(token).catch(() => {
        localStorage.removeItem("vibemotion_token");
      });
    }
  }, []);

  const fetchMe = async (token) => {
    const res = await axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data.user);
  };

  // ❌ Nincs trim(), copy-paste kompatibilis
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");
    try {
      if (forgotPassword) {
        const res = await axios.post(
          `http://localhost:5000/api/auth/forgot-password`,
          { email: form.email }
        );
        setInfo(res.data.message || "Check your email for the new password!");
        setForgotPassword(false);
        setForm({ username: "", email: "", password: "" });
      } else {
        const url = isLogin ? "/api/auth/login" : "/api/auth/register";
        const res = await axios.post(`http://localhost:5000${url}`, form);
        localStorage.setItem("vibemotion_token", res.data.token);
        setUser(res.data.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("vibemotion_token");
    setUser(null);
    setForm({ username: "", email: "", password: "" });
  };

  if (user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#2a0a4a] to-[#100018] text-white">
        <h2 className="text-3xl font-bold mb-2">
          Welcome back, {user.username || user.email}!
        </h2>
        <button
          onClick={handleLogout}
          className="mt-6 bg-neon-purple text-white px-6 py-2 rounded-lg hover:scale-105 transition"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/main_background4.jpeg)`,
        backgroundPosition: "30% center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute top-0 h-full flex flex-col items-center justify-center left-0 md:left-auto md:right-0 px-6 sm:px-12 md:px-16 lg:px-20 w-full md:w-[42%] lg:w-[40%] max-w-full transition-all duration-500 ease-in-out">
        <div className="absolute inset-0 bg-[#1b002bdd] shadow-2xl panel-clip rounded-l-[100px]" />
        <div className="absolute mt-24 top-12 w-full text-center z-10 px-2">
          <h1 className="font-extrabold mb-3 text-neon-purple drop-shadow-[0_0_25px_#a855f7]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Vibemotion
          </h1>
          <p className="text-neon-purple/80 drop-shadow-[0_0_10px_#a855f7]" style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}>
            Your mood. Your playlist. Log in for the full experience.
          </p>
        </div>
        <div className="relative z-10 flex flex-col items-center w-full max-w-md mx-auto space-y-8 mt-48">
          <div className="w-full flex flex-col">
            {!forgotPassword && (
              <h2 className="text-center font-semibold text-neon-purple drop-shadow-[0_0_20px_#a855f7]" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                {isLogin ? "Welcome Back" : "Join to Vibemotion"}
              </h2>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mt-2">
              {!isLogin && !forgotPassword && (
                <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="p-3 rounded-lg bg-[#160022aa] text-white border border-[#a855f755] focus:outline-none" />
              )}
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-3 rounded-lg bg-[#160022aa] text-white border border-[#a855f755] focus:outline-none" />
              {!forgotPassword && (
                <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="p-3 rounded-lg bg-[#160022aa] text-white border border-[#a855f755] focus:outline-none" />
              )}
              {error && <div className="text-red-400 text-sm">{error}</div>}
              {info && <div className="text-green-400 text-sm">{info}</div>}
              <button type="submit" disabled={loading} className="mt-3 p-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-glow text-white font-semibold hover:scale-105 transition">
                {loading ? "Please wait..." : forgotPassword ? "Send new password" : isLogin ? "Login" : "Register"}
              </button>
            </form>
            {!forgotPassword && isLogin && (
              <p className="text-sm text-neon-glow underline mt-2 cursor-pointer text-center" onClick={() => setForgotPassword(true)}>
                Forgot Password?
              </p>
            )}
            {forgotPassword && (
              <div className="flex flex-col items-center mt-4">
                <button onClick={() => setForgotPassword(false)} className="text-neon-glow underline text-sm">
                  Back to Login
                </button>
              </div>
            )}
            {forgotPassword && <p className="text-sm text-gray-300 mt-2 text-center">Enter your email to reset your password.</p>}
            {!forgotPassword && (
              <p className="text-sm sm:text-base text-gray-300 mt-6 text-center">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button onClick={() => setIsLogin(!isLogin)} className="text-neon-glow underline">{isLogin ? "Register" : "Login"}</button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
