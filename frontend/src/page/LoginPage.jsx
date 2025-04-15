import React, { use, useState } from "react";
import { authApi } from "../axios";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Footer from "../components/Footer";
import background from "../assets/background.jpg";
import LoginWithGoogle from "../components/LoginWithGoogle";
import AppNav from "../components/AppNav";

export default function LoginPage() {
  const navigate = useNavigate();
  const { validate, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  async function getToken(user) {
    try {
      const response = await axios.post("http://localhost:5000/login", user, {
        withCredentials: true,
      });
      if (response.status == 200) {
        alert("login successful");
        setErrorMessage("");
        validate();
        navigate("/");
      } else if (response.status == 404 || response.status == 401) {
        setErrorMessage("*" + response.data);
      }
    } catch (error) {
      console.log(error);
      // alert(error);
      if (error.response) {
        setErrorMessage("*" + error.response.data);
      }
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    const user = {
      email,
      password,
    };
    getToken(user);
  }

  const handleForgetPwd = () => {
    navigate("/forget-password");
  };

  return (
    <div className="flex flex-col bg-last/10 h-screen items-center">
      <AppNav />
      <div
        className="absolute w-screen h-screen"
        style={{
          background: `url(${background})`,
          opacity: 0.9,
          zIndex: -1,
          backgroundSize: "cover",
        }}
      ></div>
      <div className="flex md:w-[50%] h-full">
        {/* form */}
        <div
          className="flex flex-grow justify-center items-center h-[60%] 
           rounded-lg
          shadow-xl
          self-center 
        bg-white/60"
        >
          <div className="p-8 w-[80%]">
            <h1 className="text-3xl font-bold mb-2">Sign in</h1>
            <p className="mb-6">
              Don't have an account?{" "}
              <span
                className="text-secondary hover:underline cursor-pointer"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register here.
              </span>
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border 
                bg-tertiary/50 border-secondary
                 rounded-lg focus:ring-2 focus:ring-secondary"
                required
              />

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full
                  bg-tertiary/50
                  p-3 border border-secondary rounded-lg focus:ring-2 focus:ring-secondary "
                  required
                />
                {errorMessage != "" && (
                  <p className="text-sm ml-2 mt-[2px] text-red-500">
                    {errorMessage}
                  </p>
                )}
                <p
                  className="text-sm mt-[2px] ml-2 cursor-pointer
                hover:underline text-secondary
              "
                  onClick={handleForgetPwd}
                >
                  Forget your password?
                </p>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full font-bold text-white bg-secondary p-3 rounded-lg hover:bg-primary transition cursor-pointer"
              >
                Login
              </button>
              <div className="flex items-center justify-center text-sm">
                <span>Or continue with</span>
              </div>
              <LoginWithGoogle />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
