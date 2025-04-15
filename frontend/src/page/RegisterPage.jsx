import React, { useState } from "react";
import axios from "../axios";
import background from "../assets/register-background.jpg";
import { useNavigate } from "react-router-dom";
import { authApi } from "../axios";
import { useAuth } from "../AuthContext";
import LoginWithGoogle from "../components/LoginWithGoogle";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

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
    if (password !== confirmPassword) {
      setErrMsg("Your confirm password is different from password!");
      return;
    }
    const user = {
      username,
      password,
      email,
    };

    getToken(user);
  };

  return (
    <div className="flex bg-last/10">
      {/* photo */}
      <div className="w-[45vw] h-screen">
        <img src={background} className="w-full h-screen" />
      </div>

      {/* form */}
      <div className="flex flex-grow justify-center items-center h-screen">
        <div className="p-8 w-[80%]">
          <h1 className="text-3xl font-bold mb-2">Join us</h1>
          <p className="mb-6">
            Already have an account?{" "}
            <span
              className="text-secondary hover:underline cursor-pointer"
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
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2"
                required
              />
              <p className="text-sm text-gray-400 ml-2">
                *Only letters, numbers and underscore
              </p>
            </div>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 "
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2"
              required
            />
            {errMsg.length !== 0 && (
              <p className="text-sm text-red-500">*{errMsg}</p>
            )}
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
  );
}
