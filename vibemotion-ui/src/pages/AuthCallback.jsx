import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        localStorage.setItem("vibemotion_token", data.session.access_token);
        localStorage.setItem("vibemotion_user", JSON.stringify(data.session.user));
        navigate("/main"); // ide navigálunk
      } else {
        navigate("/auth");
      }
    };
    handleCallback();
  }, [navigate]);

  return <div className="text-white p-10">Loading...</div>;
}
