import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { todoContext } from "../page/HomePage";
import { useContext } from "react";
import { labelApi } from "../axios";
import { labelContext } from "./EditLabels";
import { editContext } from "./Todo";
import { useAuth } from "../AuthContext";

export default function EditOneLabel({ todoid }) {
  const { user } = useAuth();
  const { setUsedLabels, usedLabels } = useContext(editContext);
  const { colors, setLabels } = useContext(todoContext);
  const { setSelect, labelTobeEdit } = useContext(labelContext);
  const [chosenColor, setChosenColor] = useState(labelTobeEdit.color);
  const [newLabel, setNewLabel] = useState(labelTobeEdit.name);

  const handleClick = () => {
    labelApi
      .put(`/${todoid}`, {
        color: chosenColor,
        name: newLabel,
        username: user.username,
      })
      .then((res) => {
        if (res.status == 200) {
          const l = res.data;
          setUsedLabels((prev) =>
            prev.map((label) => (label.id === l.id ? l : label))
          );
          setLabels((prev) =>
            prev.map((label) => (label.id === l.id ? l : label))
          );
          console.log("after update in edit one label component");
          console.log(usedLabels);
        } else {
          alert("fail to update");
          console.log(res);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setSelect(true));
  };

  const handleDelete = () => {
    labelApi
      .delete(`/${labelTobeEdit.id}`, labelTobeEdit)
      .then((res) => {
        if (res.status == 200) {
          setUsedLabels((prev) =>
            prev.filter((label) => label.id !== labelTobeEdit.id)
          );
          setLabels((prev) =>
            prev.filter((label) => label.id !== labelTobeEdit.id)
          );
        } else {
          alert("fail to delete");
          console.log(res);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(setSelect(true));
  };
  return (
    <>
      <div className="flex mt-[2%]">
        <div>Labels</div>
        <div className="">
          <button
            className="rounded-full bg-red-200 cursor-pointer hover:bg-red-300"
            onClick={() => {
              setSelect(true);
            }}
          >
            <ArrowBackIosIcon />
          </button>
        </div>
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
      <div>Title</div>
      <div>
        <input
          type="text"
          className="ring ring-red-300 p-2
        w-[90%] h-min-[100px] text-md"
          value={newLabel}
          onChange={(e) => {
            setNewLabel(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <div>Select a color</div>
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
          className=" rounded-lg
              bg-red-200 px-2 py-1 mb-1
              hover:outline-none hover:ring-2 hover:ring-red-300 hover:border-transparent
              hover:bg-red-300 hover:text-white cursor-pointer"
          onClick={handleClick}
        >
          Save
        </button>

        {/* save button */}
        <button
          className=" rounded-lg
              bg-red-200 px-2 py-1 mb-1 
              hover:outline-none hover:ring-2 hover:ring-red-300 hover:border-transparent
              hover:bg-red-300 hover:text-white cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </>
  );
}
