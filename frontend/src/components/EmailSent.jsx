import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmailSent({ email, setEmail, handleForgetPwd }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3">
      We just sent a recovery link to you at
      <p className="font-bold text-lg">{email}</p>
      <div>
        If you haven't received the email, check your spam folder or{" "}
        <span
          className="text-secondary font-bold cursor-pointer hover:underline"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign up
        </span>
      </div>
      <div className="flex mx-4 my-3 gap-4 text-secondary">
        <p
          className="hover:font-bold hover:underline cursor-pointer"
          onClick={() => {
            navigate("/login");
          }}
        >
          Return to log in
        </p>
        <p
          className="hover:font-bold hover:underline cursor-pointer"
          onClick={handleForgetPwd}
        >
          Resent the link
        </p>
      </div>
    </div>
  );
}
