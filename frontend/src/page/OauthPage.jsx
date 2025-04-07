import React, { useState, useEffect } from "react";
import { authApi } from "../axios";

export default function OauthPage() {
  const [user, setUser] = useState("");

  useEffect(() => {
    authApi.get("/oauth2/user-info", { withCredentials: true }).then((res) => {
      console.log(res.data);
    });
  }, []);

  return <div>OauthPage</div>;
}
