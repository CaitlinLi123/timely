import React from "react";
import google_icon from "../assets/google-icon.svg";

export default function LoginWithGoogle() {
  const handleGoogleLogin = () => {
    // Redirect to Spring Boot OAuth2 login endpoint
    window.location.href = "http://localhost:5000/oauth2/authorization/google";
  };
  return (
    <button
      type="submit"
      onClick={handleGoogleLogin}
      className="w-full 
                  flex justify-center items-center gap-3 border-2 border-secondary hover:bg-tertiary
                  font-bold p-3 rounded-lg transition cursor-pointer"
    >
      <img src={google_icon} alt="google icon" className="h-6 w-6" />
      Google
    </button>
  );
}
