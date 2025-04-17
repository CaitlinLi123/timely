import React from "react";

export default function AuthBoard({ children }) {
  return (
    <div className="flex w-[60%] max-w-[700px] h-full">
      <div
        className="flex flex-grow justify-center items-center 
           rounded-lg
          shadow-xl
          self-center 
        bg-white/60"
      >
        <div className="p-8 w-[80%] py-[50px]">{children}</div>
      </div>
    </div>
  );
}
