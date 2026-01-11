//SpotifyLogin.jsx
import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SpotifyLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    async function signIn() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "spotify",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: "user-read-email user-read-private"
        }
      });

      if (error) {
        console.error("Spotify sign-in error:", error);
        navigate("/auth?error=spotify");
      }
    }

    signIn();
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-white text-lg animate-pulse">Connecting to Spotify...</p>
    </div>
  );
}
