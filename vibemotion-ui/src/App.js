// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GoogleLogin from "./pages/GoogleLogin";
import SpotifyLogin from "./pages/SpotifyLogin";

import { AuthProvider } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage";
import AuthCallback from "./pages/AuthCallback";
import MainPage from "./pages/MainPage";

import UpdatePassword from "./pages/UpdatePassword";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/google" element={<GoogleLogin />} />
          <Route path="/spotify" element={<SpotifyLogin />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
