import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import { useAuth } from "../AuthContext";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import tableIcon from "../assets/table.svg";
import ProfilePanel from "./ProfilePanel";

export default function AppNav() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [avatarLetter, setAvatarLetter] = useState("");
  const [showUserProfilePanel, setShowUserProfilePanel] = useState(false);

  useEffect(() => {
    if (user != null) {
      setAvatarLetter(user.username[0]);
    } else {
      setAvatarLetter("");
    }
  }, [user]);

  return (
    <div className="flex w-full flex-col grid grid-cols-4 justify-center items-center">
      <div className=" justify-self-start  text-2xl col-span-3">To do list</div>
      <div className="grid grid-cols-2 divide-x place-content-center">
        <button className="flex justify-center gap-2 items-center cursor-pointer">
          <img src={tableIcon} alt="view icon" className="w-6 h-6" />
          Views
        </button>
        {/* User Avatars: username's first letter */}
        <div className="relative justify-self-center flex items-center place-content-center gap-3">
          {!loading && (
            <div
              className="
              flex
              bg-light-green rounded-full h-10 w-10 text-black flex font-bold text-2xl
        justify-center items-center text-center"
              onClick={() => {
                setShowUserProfilePanel((show) => !show);
              }}
            >
              {avatarLetter[0]}
            </div>
          )}

          {showUserProfilePanel && <ProfilePanel />}
        </div>
      </div>
    </div>
  );
}
