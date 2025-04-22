import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { authApi } from "../axios";
import { useAuth } from "../AuthContext";
import AppNav from "../components/AppNav";
import LoginWithGoogle from "../components/LoginWithGoogle";
import BackgroundImage from "../components/BackgroundImage";
import Footer from "../components/Footer";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(false);
  const navigate = useNavigate();

  async function getToken(user) {
    try {
      const response = await authApi.post("/register", user);
      if (response.status == 200) {
        alert("Register successful");
        setErrMsg("");
        navigate("/");
      } else {
        setErrMsg(error.response.data);
      }
    } catch (error) {
      if (error.response) {
        // alert(error.response.data);
        setErrMsg(error.response.data);
      } else {
        console.log(error);
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (password !== confirmPassword) {
    //   setErrMsg("Your confirm password is different from password!");
    //   return;
    // }
    if (usernameValid && passwordValid) {
      const user = {
        username,
        password,
        email,
      };

      getToken(user);
    }
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordValid(false);
      setErrMsg("Your confirm password is different from password!");
    } else {
      setPasswordValid(true);
      setErrMsg("");
    }
  }, [password, confirmPassword]);

  return (
    <div className="flex flex-col bg-last/10 h-screen w-screen items-center">
      <AppNav />
      {/* background image */}
      <BackgroundImage />
      {/* registration board */}
      <div className="flex w-[60%] max-w-[700px] h-full">
        <div
          className="flex flex-grow justify-center items-center 
           rounded-lg
          shadow-xl
          self-center 
        bg-white/60"
        >
          <div className="p-8 w-[80%] py-[50px]">
            <h1 className="text-3xl font-bold mb-1">Join us</h1>
            <p className="mb-6">
              Already have an account?{" "}
              <span
                className="text-secondary hover:underline hover:font-bold cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login here.
              </span>
            </p>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    let value = e.target.value;
                    if (/^[a-zA-Z0-9_]*$/.test(value)) {
                      setUsernameValid(true);
                    } else {
                      setUsernameValid(false);
                    }
                    setUsername(value);
                  }}
                  className="w-full p-3 
                  bg-tertiary/50
                  border border-secondary rounded-lg focus:ring-2"
                  required
                />
                <p
                  className={
                    usernameValid
                      ? "text-sm ml-2 text-primary"
                      : "text-sm ml-2 text-red-600 font-bold"
                  }
                >
                  *Only letters, numbers and underscore
                </p>
              </div>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 
                bg-tertiary/50
                border border-primary rounded-lg focus:ring-2"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 
                bg-tertiary/50
                border border-primary rounded-lg focus:ring-2 "
                required
              />

              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 bg-tertiary/50 border border-primary rounded-lg focus:ring-2"
                  required
                />
                {errMsg.length !== 0 && (
                  <p className="text-sm text-red-600 font-bold ml-2">
                    *{errMsg}
                  </p>
                )}
              </div>

              <button
                type="submit"
                onClick={() => {
                  handleSubmit(event);
                }}
                className="w-full font-bold text-white bg-secondary p-3 rounded-lg hover:bg-primary transition cursor-pointer"
              >
                Register
              </button>
              <div className="flex items-center justify-center text-sm">
                <span>Or continue with</span>
              </div>
              <LoginWithGoogle />
            </form>
          </div>
        </div>
      </div>
      <Footer />
      {/* form */}
    </div>
  );
}
