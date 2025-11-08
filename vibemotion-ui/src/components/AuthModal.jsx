// src/components/AuthModal.jsx
import React, { useState } from "react";

const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6">
      {/* Register / Log In button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Register / Log In
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg text-center w-80">
            <h2 className="text-2xl font-semibold mb-4">Welcome to Vibemotion 🎶</h2>

            <div className="space-y-3">
              <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                Sign in with Spotify
              </button>
              <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                Sign in with Google
              </button>
              <button className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition">
                Sign up / Log in manually
              </button>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthModal;
