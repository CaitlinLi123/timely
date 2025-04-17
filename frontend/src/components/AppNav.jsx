import React, { useEffect, useState } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
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
    <div
      className="flex w-full flex-col 
    grid grid-cols-4 
    py-2 px-4
    bg-linear-to-r from-primary to-secondary
    justify-center items-center "
    >
      {/* logo */}
      <div
        className="justify-self-start text-2xl col-span-3 
      font-bold bg-primary rounded-xl py-1 px-2 text-white"
        onClick={() => {
          navigate("/");
        }}
      >
        <span>
          <AccessAlarmIcon />
        </span>
        Timely
      </div>

      {/* views and avatar */}
      <div className="">
        {/* <button
          className="flex justify-center gap-2 items-center 
        cursor-pointer hover:text-primary text-rose-100"
        >
          <span>
            <TableChartIcon />
          </span>
          Views
        </button> */}

        {/* User Avatars: username's first letter */}
        <div className="relative justify-self-center flex items-center place-content-center gap-3">
          {!loading && user != null && (
            <div
              className="
              flex cursor-pointer
              bg-last rounded-full h-10 w-10 text-black flex font-bold text-2xl
        justify-center items-center text-center"
              onClick={() => {
                if (user != null) {
                  setShowUserProfilePanel((show) => !show);
                }
              }}
              title="User Profile"
            >
              {avatarLetter[0]}
            </div>
          )}

          {showUserProfilePanel && (
            <ProfilePanel setShowUserProfilePanel={setShowUserProfilePanel} />
          )}
        </div>
      </div>
    </div>
  );
}
