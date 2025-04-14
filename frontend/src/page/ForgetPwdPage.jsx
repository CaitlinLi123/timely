import React, { use, useState } from "react";
import { authApi } from "../axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import background from "../assets/login-background.jpg";
import ForgetPwdInput from "../components/ForgetPwdInput";
import EmailSent from "../components/EmailSent";

export default function ForgetPwdPage() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleForgetPwd = () => {
    setEmailSent(true);
    authApi
      .get(`/forget-password?email=${email}`, { withCredentials: true })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="flex">
      <div className="flex flex-grow justify-center items-center h-screen">
        <div className="p-8 w-[80%]">
          <h1 className="text-3xl font-bold mb-2">Recover your account</h1>
          {emailSent ? (
            <EmailSent
              email={email}
              setEmail={setEmail}
              handleForgetPwd={handleForgetPwd}
            />
          ) : (
            <ForgetPwdInput
              email={email}
              setEmail={setEmail}
              handleForgetPwd={handleForgetPwd}
              //   setEmailSent={setEmailSent}
            />
          )}
        </div>
      </div>
    </div>
  );
}
