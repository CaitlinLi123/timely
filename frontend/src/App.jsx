import { useContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import { AuthProvider, useAuth } from "./AuthContext";
import OauthPage from "./page/OauthPage";
import ForgetPwdPage from "./page/ForgetPwdPage";

function App() {
  // if not authenticated, then redirect to login page
  // if it is, jump to homepage

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/oauth" element={<OauthPage />}></Route>
          <Route path="/forget-password" element={<ForgetPwdPage />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
