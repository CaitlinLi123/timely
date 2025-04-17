import React, { Children } from "react";

export default function EditPartBoard({ children }) {
  return (
    <div
      className="absolute w-[25%] left-[10%] min-h-[200px] min-w-[250px]
    shadow-xl bg-gray-100 place-items-center gap-4 py-2 
    flex flex-col bg-white  my-2 p-4 z-40 rounded-lg"
      key={new Date(Date.now)}
    >
      {children}
    </div>
  );
}
