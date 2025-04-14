import React from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPwdInput({
  email,
  setEmail,
  handleForgetPwd,
  setEmailSent,
}) {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <p>We will send a recovery link to</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2"
        required
      />

      <button
        type="submit"
        onClick={handleForgetPwd}
        className="w-full font-bold text-white bg-red-400 p-3 rounded-lg hover:bg-red-600 transition cursor-pointer"
      >
        Send the link
      </button>
      <p
        className="cursor-pointer 
              text-gray-400 hover:underline"
        onClick={() => {
          navigate("/login");
        }}
      >
        Return to log in
      </p>
    </div>
  );
}
