import React from "react";
import CloseIcon from "@mui/icons-material/Close";
export default function SortPanel({ setShowSort, setSortMode }) {
  return (
    <div
      className="absolute bg-white top-[100%] right-[20%] p-2
    z-30 rounded-lg w-[300px] shadow-xl border border-gray-200"
    >
      {/* title */}
      <div
        className="w-full py-1 px-2 text-center
        border-b border-b-gray-200"
      >
        <span
          className="absolute right-2 hover:bg-tertiary rounded-full 
          transition p-2
            w-5 h-5 m-auto cursor-pointer hover:text-white flex items-center justify-center"
        >
          <CloseIcon
            // src={closeIcon}
            onClick={() => {
              setShowSort(false);
            }}
          />
        </span>
        <div>Sort</div>
      </div>
      {/* Selection */}
      <div className="flex flex-col gap-2 mt-2 w-full">
        <div
          className="hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            setSortMode("ascending");
          }}
        >
          Sort Ascending
        </div>
        <div
          className="hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            setSortMode("descending");
          }}
        >
          Sort Descending
        </div>
      </div>
    </div>
  );
}
