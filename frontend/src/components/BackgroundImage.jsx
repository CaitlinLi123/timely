import React from "react";
import background from "../assets/background.jpg";
export default function BackgroundImage() {
  return (
    <div
      className="absolute w-screen h-screen"
      style={{
        background: `url(${background})`,
        opacity: 0.9,
        zIndex: -1,
        backgroundSize: "cover",
      }}
    ></div>
  );
}
