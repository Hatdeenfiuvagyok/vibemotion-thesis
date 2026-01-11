//SpotifyAuthCallBack.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function SpotifyAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleCallback() {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.error("OAuth error:", error);
        navigate("/auth");
        return;
      }

      const user = data.session.user;

      localStorage.setItem("vibemotion_token", data.session.access_token);
      localStorage.setItem("vibemotion_user", JSON.stringify(user));

      navigate("/main");
    }

    handleCallback();
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center text-white">
      <h1 className="text-2xl animate-pulse">Connecting to Spotify...</h1>
    </div>
  );
}
