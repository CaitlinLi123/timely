import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { todoContext } from "../page/HomePage";
import { useAuth } from "../AuthContext";
import { labelContext } from "./EditLabels";
import { useContext } from "react";
import { labelApi } from "../axios";
export default function CreateLabels() {
  const { colors, labels, setLabels } = useContext(todoContext);
  const [chosenColor, setChosenColor] = useState("#FCA5A5");
  const [newLabel, setNewLabel] = useState("your new label");
  const { user } = useAuth();
  const { setSelect } = useContext(labelContext);

  const handleClick = () => {
    labelApi
      .post("/", {
        color: chosenColor,
        name: newLabel,
        username: user.username,
      })
      .then((res) => {
        if (res.status == 201) {
          const l = res.data;
          setLabels([...labels, l]);
        } else {
          alert("fail to create a new label");
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(setSelect(true));
  };
  return (
    <>
      <div className="flex mt-[2%] w-full items-center justify-center">
        <div className="font-bold text-xl border-b border-gray-300 w-full flex justify-center">
          Labels
        </div>

        <span
          className="absolute flex items-center justify-center w-6 h-6
                     rounded-full cursor-pointer hover:bg-primary hover:text-white right-[5%]"
          onClick={() => {
            setSelect(true);
          }}
        >
          <ArrowBackIosIcon fontSize="small" />
        </span>
      </div>

      {/* show board */}
      <div className="w-full bg-gray-200 h-[100px] flex flex-wrap content-center justify-center">
        <div
          className="w-[4/5] h-[30px] text-white p-2 flex flex-wrap content-center justify-center"
          style={{ backgroundColor: chosenColor }}
        >
          {newLabel}
        </div>
      </div>
      <div>
        <div className="mb-2 font-bold">Title</div>
        <div>
          <input
            type="text"
            className="ring ring-tertiary p-2
        w-[90%] h-min-[100px] text-md"
            value={newLabel}
            onChange={(e) => {
              setNewLabel(e.target.value);
            }}
          ></input>
        </div>
      </div>

      <div>
        <div className="font-bold">Select a color</div>
        <div className="grid grid-cols-3 gap-2 cursor-pointer">
          {colors.map((color) => (
            <div
              className="h-15 w-15"
              key={color}
              style={{ backgroundColor: color }}
              onClick={() => {
                setChosenColor(color);
              }}
            ></div>
          ))}
        </div>
      </div>
      <div
        className="flex justify-between w-full text-md border-t 
            border-gray-300
            pt-2"
      >
        {/* save button */}
        <button
          className=" rounded-lg w-15
              bg-tertiary px-2 py-1 mb-1
              hover:outline-none hover:border-transparent
              hover:bg-primary text-white cursor-pointer"
          onClick={handleClick}
        >
          Save
        </button>

        {/* save button */}
        <button
          className=" rounded-lg w-15
              bg-tertiary px-2 py-1 mb-1 
              hover:outline-none hover:border-transparent
              hover:bg-primary text-white cursor-pointer"
        >
          Clear
        </button>
      </div>
    </>
  );
}
