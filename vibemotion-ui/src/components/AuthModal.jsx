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
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
      >
        Register / Log In
      </button>

      {/* 🔹 Felugró modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-900 rounded-2xl p-8 w-96 shadow-lg relative animate-fadeIn">
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">
              {isLogin ? "Log In to Vibemotion" : "Create a Vibemotion Account"}
            </h2>

            <form className="flex flex-col gap-4">
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Username"
                  className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium mt-2"
              >
                {isLogin ? "Log In" : "Register"}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-4">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <span
                    onClick={toggleMode}
                    className="text-green-400 hover:underline cursor-pointer"
                  >
                    Register
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={toggleMode}
                    className="text-green-400 hover:underline cursor-pointer"
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
