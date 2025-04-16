import React, { use, useState } from "react";
import { authApi } from "../axios";

import ForgetPwdInput from "../components/ForgetPwdInput";
import EmailSent from "../components/EmailSent";
import AppNav from "../components/AppNav";
import Footer from "../components/Footer";
import BackgroundImage from "../components/BackgroundImage";
import AuthBoard from "../components/AuthBoard";

export default function ForgetPwdPage() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleForgetPwd = () => {
    if (email.length > 0) {
      setEmailSent(true);
      authApi
        .get(`/forget-password?email=${email}`, { withCredentials: true })
        .then((res) => {
          console.log(res);
        });
    }
  };

  return (
    <div className="flex flex-col items-center bg-last/10 h-screen">
      {/* Navigation bar */}
      <AppNav />
      {/* Main contents */}
      <BackgroundImage />

      <AuthBoard>
        <div className="p-8">
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
      </AuthBoard>

      {/* Footer */}
      <Footer />
    </div>
  );
}
