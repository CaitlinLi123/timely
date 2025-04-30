import React, { useContext, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { todoContext } from "../page/HomePage";
import { editContext } from "./Todo";
import { labelContext } from "./EditLabels";
import { todoApi } from "../axios";

export default function SelectLabels({ todoid }) {
  const { setLabelTobeEdit, setSelect, setEditALabel } =
    useContext(labelContext);
  const { usedLabels, setUsedLabels, setEditLabels } = useContext(editContext);
  const { labels } = useContext(todoContext);

  const [tmpLabels, setTmpLabels] = useState([...usedLabels]);

  const handleClick = () => {
    todoApi
      .patch(`/${todoid}/label`, tmpLabels)
      .then((res) => {
        if (res.status === 200) {
          setUsedLabels(tmpLabels);
          alert("success to update labels");
        } else {
          alert("fail to update labels");
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(setEditLabels(false));
  };

  return (
    <>
      {/* title */}
      <div className="flex w-full">
        {/* title and close button */}
        <div
          className="text-xl border-b border-gray-300 font-bold 
        pb-[10px]
        w-full flex justify-center"
        >
          Labels
        </div>
        <div>
          <span
            className="
                    absolute flex
                    right-[5%] text-white
                    rounded-full bg-tertiary cursor-pointer hover:bg-primary transition"
            onClick={() => {
              // console.log("Closing EditLabels...");
              setEditLabels(false);
            }}
          >
            <CloseIcon />
          </span>
        </div>
      </div>

      {/* search bar */}
      {/* <Autocomplete
        multiple
        id="labels-autocomplete"
        onChange={(event, value) => {
          setUsedLabels(value);
        }}
        // value={usedLabels.map(usedLabel=>usedLabel.name)}
        // options={labels != null ? labels.map((label) => label.name) : []}
        value={tmpLabels}
        options={labels || []}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField {...params} label="Labels" />}
      /> */}

      {/* checkboxes */}
      <div
        className="flex flex-col  w-full gap-2 pb-[25px]
      border-b border-gray-300 justify-center items-center py-2"
      >
        {labels
          ? labels.map((label) => (
              <div key={label.id} className="flex gap-2">
                <input
                  type="checkbox"
                  id={label.name}
                  name={label.name}
                  value={label.name}
                  checked={tmpLabels.some(
                    (tmpLabel) => tmpLabel.id === label.id
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTmpLabels([...tmpLabels, label]);
                    } else {
                      setTmpLabels(tmpLabels.filter((l) => l.id != label.id));
                    }
                  }}
                />
                <label
                  htmlFor={label.name}
                  style={{ backgroundColor: label.color }}
                  className="px-2 rounded-lg"
                >
                  {label.name}
                </label>
                <span
                  className="rounded-sm h-5 w-5 hover:text-white
                   text-black cursor-pointer hover:bg-tertiary
                   transition
                    flex align-items-center"
                  onClick={() => {
                    setLabelTobeEdit(label);
                    setSelect(false);
                    setEditALabel(true);
                  }}
                >
                  <EditIcon fontSize="small" />
                </span>
              </div>
            ))
          : null}
      </div>

      {/* create new labels */}
      <div className="w-full flex justify-center items-center">
        <button
          className=" rounded-lg
              bg-tertiary p-2  text-white font-bold transition
              hover:outline-none hover:border-transparent
              hover:bg-primary cursor-pointer"
          onClick={() => {
            setSelect(false);
          }}
        >
          Create new labels
        </button>
      </div>

      <div
        className="flex justify-between w-full text-md border-t 
            border-gray-300
            pt-2"
      >
        {/* save button */}
        <button
          className=" rounded-lg w-15
              bg-tertiary px-2 py-1 transition
              hover:outline-none  hover:border-transparent
              hover:bg-primary text-white cursor-pointer"
          onClick={handleClick}
        >
          Save
        </button>

        {/* save button */}
        <button
          className=" rounded-lg 2-15
              bg-tertiary px-2 py-1 
               hover:border-transparent transition
              hover:bg-primary text-white cursor-pointer"
          onClick={() => setUsedLabels([])}
        >
          Clear
        </button>
      </div>
    </>
  );
}
