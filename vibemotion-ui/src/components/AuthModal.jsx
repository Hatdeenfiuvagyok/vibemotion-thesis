import React, { useState, useEffect } from "react";
import axios from "axios";

function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // check token on mount
  useEffect(() => {
    const token = localStorage.getItem("vibemotion_token");
    if (token) fetchMe(token);
  }, []);

  const fetchMe = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.warn("me failed", err);
      localStorage.removeItem("vibemotion_token");
    }
  };

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await axios.post(`http://localhost:5000${url}`, {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("vibemotion_token", res.data.token);
      setUser(res.data.user);
      setIsOpen(false);
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Auth failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("vibemotion_token");
    setUser(null);
  };

  // UI
  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-200">Hi, <span className="font-semibold">{user.username || user.email}</span></div>
        <button onClick={handleLogout} className="bg-gray-700 px-3 py-1 rounded-md text-white">Logout</button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-neon-purple text-white px-4 py-2 rounded-lg font-medium shadow-[0_0_10px_#a855f7]"
      >
        Register / Log In
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50" onClick={() => setIsOpen(false)}>
          <div className="bg-gradient-to-br from-neon-dark to-black rounded-2xl p-6 w-96" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-2 text-neon-glow">{isLogin ? "Log In" : "Register"}</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {!isLogin && (
                <input name="username" value={form.username} onChange={handleChange}
                  placeholder="Username" className="p-2 rounded bg-gray-800 text-white" />
              )}
              <input name="email" value={form.email} onChange={handleChange}
                placeholder="Email" className="p-2 rounded bg-gray-800 text-white" />
              <input name="password" value={form.password} onChange={handleChange}
                type="password" placeholder="Password" className="p-2 rounded bg-gray-800 text-white" />

              {error && <div className="text-red-400 text-sm">{error}</div>}

              <button type="submit" disabled={loading}
                className="bg-neon-purple text-white py-2 rounded mt-2">
                {loading ? "Please wait..." : (isLogin ? "Log In" : "Register")}
              </button>
            </form>

            <p className="text-sm text-gray-400 mt-3">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span onClick={() => setIsLogin(!isLogin)} className="text-neon-glow cursor-pointer">
                {isLogin ? "Register" : "Log In"}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default AuthModal;
