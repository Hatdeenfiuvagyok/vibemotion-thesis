import React, { useState } from "react";

function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const toggleModal = () => setIsOpen(!isOpen);
  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <>
      {/* 🔹 Jobbfelső gomb */}
      <button
        onClick={toggleModal}
        className="bg-neon-purple hover:bg-neon-glow text-white px-5 py-2 rounded-lg font-semibold shadow-[0_0_10px_#a855f7] hover:shadow-[0_0_20px_#a855f7] transition-all duration-300"
      >
        Register / Log In
      </button>

      {/* 🔹 Felugró modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-gradient-to-br from-neon-dark via-gray-900 to-black rounded-2xl p-8 w-96 shadow-[0_0_25px_#a855f7] relative animate-fadeIn border border-neon-purple/30">
            
            {/* Bezárás gomb */}
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-neon-glow hover:text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-extrabold mb-6 text-center text-neon-glow drop-shadow-[0_0_8px_#a855f7]">
              {isLogin ? "Log In to Vibemotion" : "Create a Vibemotion Account"}
            </h2>

            {/* Form mezők */}
            <form className="flex flex-col gap-4">
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Username"
                  className="p-2 rounded-lg bg-gray-800/70 border border-neon-purple/40 focus:border-neon-glow focus:outline-none text-white placeholder-gray-400"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                className="p-2 rounded-lg bg-gray-800/70 border border-neon-purple/40 focus:border-neon-glow focus:outline-none text-white placeholder-gray-400"
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 rounded-lg bg-gray-800/70 border border-neon-purple/40 focus:border-neon-glow focus:outline-none text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-neon-purple hover:bg-neon-glow text-white py-2 rounded-lg font-semibold mt-2 shadow-[0_0_15px_#a855f7] hover:shadow-[0_0_25px_#a855f7] transition-all duration-300"
              >
                {isLogin ? "Log In" : "Register"}
              </button>
            </form>

            {/* Váltás login <-> register között */}
            <p className="text-center text-gray-400 text-sm mt-4">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <span
                    onClick={toggleMode}
                    className="text-neon-glow hover:underline cursor-pointer"
                  >
                    Register
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={toggleMode}
                    className="text-neon-glow hover:underline cursor-pointer"
                  >
                    Log In
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default AuthModal;
