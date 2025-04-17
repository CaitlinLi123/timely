import React from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

export default function ProfilePanel({ setShowUserProfilePanel }) {
  const { user, setUser } = useAuth();
  let email = user.email;

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    axios
      .get("http://localhost:5000/logout", { withCredentials: true })
      .then((res) => {
        alert(res.data);
        setUser(null);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div
      className="absolute top-[110%] right-[0%]  shadow-lg z-10 
    bg-white text-black rounded-md
    border border-gray-200 flex flex-col p-3"
    >
      {/* title */}
      <div className="text-lg font-bold text-center text-primary border-b border-gray-300">
        Account
        {/* close button */}
        <span
          className="absolute right-3 top-3 rounded-full transition hover:bg-tertiary h-6 w-6
         flex items-center justify-center cursor-pointer hover:text-white "
          onClick={() => {
            setShowUserProfilePanel(false);
          }}
        >
          <CloseIcon />
        </span>
      </div>

      {/* user info */}
      <div
        className="flex gap-2 py-[10px] 
        items-center justify-center
      border-b border-gray-300"
      >
        {/* Avatar */}
        <div
          className="h-10 w-10 rounded-full 
        bg-last flex font-bold text-2xl
        items-center justify-center"
        >
          {user.username[0]}
        </div>
        {/* username and email */}
        <div className="flex flex-col text-sm">
          <div>{user.username}</div>
          <div>{email}</div>
        </div>
      </div>

      {/* buttons */}
      <div className="mt-1">
        <div className="cursor-pointer hover:bg-last hover:font-bold">
          Edit Profile
        </div>
        <div
          className="cursor-pointer hover:bg-last hover:font-bold"
          onClick={handleLogout}
        >
          Log out
        </div>
      </div>
    </div>
  );
}
