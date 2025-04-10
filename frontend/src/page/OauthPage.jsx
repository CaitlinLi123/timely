import React, { useState, useEffect } from "react";
import { authApi } from "../axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import LinkAccount from "../components/LinkAccount";

export default function OauthPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [message, setMessage] = useState(null);
  const [linkAccount, setLinkAccount] = useState(false);
  const [userFound, setUserFound] = useState(null);

  useEffect(() => {
    authApi.get("/oauth2/user-info", { withCredentials: true }).then((res) => {
      console.log(res);
      if (res.status === 201) {
        // created a new user
        setUser(res.data.user);
        navigate("/");
      } else if (res.status === 200) {
        // existing account,link or not
        if (res.data.message === "OK to log in") {
          setUser(res.data.user);
          navigate("/");
        } else if (
          res.data.message.startsWith("There's no google account linked")
        ) {
          setLinkAccount(true);
          setUserFound(res.data.user);
          setMessage(res.data.message);
        }
      } else {
        alert(e);
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {/* {message} */}
      {linkAccount && <LinkAccount userFound={userFound} />}
    </div>
  );
}
