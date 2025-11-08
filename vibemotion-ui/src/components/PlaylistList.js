import React from "react";

function PlaylistList({ playlists }) {
  if (!playlists.length) {
    return <p className="text-center mt-10 text-gray-400">No playlists found. Try searching a mood!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 p-8">
      {playlists.map((p) => (
        <a
          key={p.id}
          href={p.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="border rounded-xl shadow-lg hover:scale-105 transition-transform p-4 bg-white text-black"
        >
          <img
            src={p.images[0]?.url}
            alt={p.name}
            className="rounded-lg mb-4 w-full h-48 object-cover"
          />
          <h2 className="text-xl font-semibold">{p.name}</h2>
          <p className="text-sm text-gray-600 mt-2">{p.description || "No description"}</p>
        </a>
      ))}
    </div>
  );
}

export default PlaylistList;
