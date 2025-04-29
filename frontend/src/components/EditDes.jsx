import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { todoApi } from "../axios";
import EditPartBoard from "./EditPartBoard";

export default function EditDes({
  oldDesc,
  setEditDes,
  todoid,
  setDescription,
}) {
  const [newDesc, setNewDesc] = useState(oldDesc);

  const editDesc = () => {
    todoApi
      .patch(
        `/${todoid}/description?description=${newDesc}`,
        // {"description":description},
        // JSON.stringify(newDesc),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setDescription(res.data.description);
          alert("success");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <EditPartBoard>
      <div className="absolute top-2 right-2 flex">
        <button
          className="rounded-full cursor-pointer 
        h-6 w-6 hover:bg-tertiary hover:text-white"
        >
          <CloseIcon
            onClick={() => {
              setEditDes(false);
            }}
          />
        </button>
      </div>

      <div
        className="pb-[2%] w-full font-bold text-lg 
      flex justify-center
      border-b border-gray-300"
      >
        Edit Description
      </div>
      <input
        type="text"
        value={newDesc}
        onChange={(e) => {
          setNewDesc(e.target.value);
        }}
        placeholder="Description"
        className="ring bg-tertiary text-white border-transparent
        w-[90%] h-[75%] text-sm py-0 px-2 rounded-lg flex-grow
        "
      ></input>
      <div className="flex gap-4">
        <button
          className=" rounded-lg w-15
      bg-secondary text-white px-2 py-1 mb-1 
      hover:outline-none hover:ring-2 hover:primary hover:border-transparent
      hover:bg-primary transition cursor-pointer"
          onClick={editDesc}
        >
          Save
        </button>
        <button
          className=" rounded-lg w-15
      bg-secondary text-white px-2 py-1 mb-1 
      hover:outline-none hover:ring-2 hover:primary hover:border-transparent
      hover:bg-primary transition cursor-pointer"
          onClick={() => {
            setNewDesc(oldDesc);
          }}
        >
          Clear
        </button>
      </div>
    </EditPartBoard>
  );
}
