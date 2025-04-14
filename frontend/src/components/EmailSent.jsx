import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmailSent({ email }) {
  const navigate = useNavigate();
  return (
    <div>
      We sent a recovery link to you at
      <p className="font-bold text-lg">{email}</p>
      If you haven't received the email, check your spam folder or
      <span
        onClick={() => {
          navigate("/signup");
        }}
      >
        Sign up
      </span>
      <div className="flex mx-4 my-3">
        <p
          onClick={() => {
            navigate("/login");
          }}
        >
          Return to log in
        </p>
        <p>Resent recovery link</p>
      </div>
    </div>
  );
}
