import React, { useEffect, useState } from "react";
import { authApi } from "../axios";
import { useNavigate } from "react-router-dom";

export default function LinkAccount({ userFound }) {
  const navigate = useNavigate();
  const [link, setLink] = useState(false);
  const [pwd, setPwd] = useState("");

  const handleLinkAccount = (pwd) => {
    userFound["password"] = pwd;
    console.log(userFound);
    authApi
      .post("/login", userFound, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          // succeed in logging in
          authApi
            .post("/link-google-account", userFound, { withCredentials: true })
            .then((res) => {
              if (res.status === 200) {
                alert(
                  "succeed in linking your account to your google account!"
                );
                navigate("/");
              } else {
                console.log(res.data);
              }
            });
        } else {
          alert(res.data.data);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="h-[80%] w-full flex flex-col p-[20px] items-center">
      <span className="underline text-xl">
        This email already has an account.
      </span>
      <div className="flex flex-col p-[20px] gap-3">
        <div>
          <span className="font-bold">Username:</span> {userFound.username}
        </div>
        <div>
          <span className="font-bold">Email:</span> {userFound.email}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-3 w-full items-center">
        <span className="underline text-lg">
          Do you want to link it with your google account?
        </span>
        <button
          onClick={() => {
            setLink(true);
          }}
          className="rounded-md bg-red-400 px-3 text-white font-bold text-lg h-[50px] w-[50%] cursor-pointer"
        >
          Yes, this is my account.
        </button>
        <button
          title="click me to recover your account"
          className="rounded-md bg-black px-3 text-white font-bold text-lg h-[50px] w-[50%]"
        >
          No, this is not my account!
        </button>
        {link && (
          <div className="flex flex-col gap-4 m-3 w-[50%]">
            <input
              className="border border-gray-300 rounded-md px-2 py-1 mt-2 h-[50px]"
              type="text"
              name="link-account-password"
              value={pwd}
              placeholder="Your Password here..."
              onChange={(event) => {
                setPwd(event.target.value);
              }}
            />
            <div className="underline text-sm mt-[-2%]">
              Forget your password?
            </div>
            <button
              className="rounded-md  border border-gray-400 hover:bg-gray-300 px-3 font-bold text-lg h-[30px] w-[50%] cursor-pointer"
              onClick={() => {
                handleLinkAccount(pwd);
              }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
