import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function SideBar({ isOpen, onClose }) {
  const location = useLocation();

  const menuItems = [
    { name: "Profile", path: "/profile" },
    { name: "Favourite", path: "/favourite" },
  ];

  return (
    <>
      {/* Mobil overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-24 left-0 h-[calc(100%-6rem)] w-60 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0 bg-gradient-to-b from-black via-[#1a002e] to-[#3b0066]" : "-translate-x-full"} 
          z-40 md:translate-x-0 md:bg-transparent`}
      >
        {/* X gomb mobilon */}
        <button
          className="text-white text-3xl self-end m-4 md:hidden"
          onClick={onClose}
        >
          &times;
        </button>

        <nav className="flex flex-col gap-4 mt-6 p-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`p-3 rounded-lg hover:bg-neon-purple/40 transition ${
                location.pathname === item.path ? "bg-neon-purple/60" : ""
              }`}
              onClick={onClose}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
