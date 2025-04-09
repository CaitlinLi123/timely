import React, { useState, useEffect } from "react";
import { authApi } from "../axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import LinkAccount from "../components/LinkAccount";

export default function OauthPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [linkAccount, setLinkAccount] = useState(false);

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
        } else {
          setLinkAccount(true);
        }
      } else {
        alert(e);
        navigate("/");
      }
    });
  }, []);

  return (
    <div>
      OauthPage
      {linkAccount && <LinkAccount />}
    </div>
  );
}
