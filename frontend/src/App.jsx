import { useContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import { AuthProvider, useAuth } from "./AuthContext";
import OauthPage from "./page/OauthPage";
import ForgetPwdPage from "./page/ForgetPwdPage";
import ResetPwdPage from "./page/ResetPwdPage";
import PageNotFound from "./page/PageNotFound";

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
          <Route path="/reset" element={<ResetPwdPage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
