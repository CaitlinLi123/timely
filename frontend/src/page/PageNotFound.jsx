import React from "react";
import AppNav from "../components/AppNav";
import Footer from "../components/Footer";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <AppNav />
      Uh oh! This is an undefined Page.
      <Footer />
    </div>
  );
}
