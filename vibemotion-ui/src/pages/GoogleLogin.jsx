//GoogleLogin.jsx
import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function GoogleLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    async function signIn() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) {
        console.error("Google sign-in error:", error);
        navigate("/auth?error=google");
      }
    }

    signIn();
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-white text-lg animate-pulse">Connecting to Google...</p>
    </div>
  );
}
