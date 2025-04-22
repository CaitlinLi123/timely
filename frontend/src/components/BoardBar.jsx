import React, { useContext, useEffect, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import FilterPanel from "./FilterPanel";
import { todoContext } from "../page/HomePage";
import SortPanel from "./SortPanel";
import { todoApi } from "../axios";
import { useAuth } from "../AuthContext";
import TuneIcon from "@mui/icons-material/Tune";

export default function BoardBar({ setShowAdd }) {
  const [showSort, setShowSort] = useState(false);
  const [sortMode, setSortMode] = useState(null);
  const [haveFiltered, setHaveFiltered] = useState(false);
  const handleClick = () => {
    setShowAdd(true);
  };
  const handleSortDescending = () => {
    const sorted = [...todos].sort(
      (t1, t2) => new Date(t1.date) - new Date(t2.date)
    );
    setTodos(sorted); // Ensure you update the state
  };

  const handleSortAscending = () => {
    const sorted = [...todos].sort(
      (t1, t2) => new Date(t2.date) - new Date(t1.date)
    );
    setTodos(sorted); // Ensure you update the state
  };

  // const sortById = ()=>{
  //    const sorted = [...todos].sort((t1, t2) => t1.id - t2.id);
  //   setTodos(sorted); // Ensure you update the state
  // }

  const { showFilter, setShowFilter, todos, setTodos } =
    useContext(todoContext);
  const { user } = useAuth();

  const getAllTodos = () => {
    todoApi
      .get(`/todos/all/${user.username}`)
      .then((res) => {
        if (res.data) {
          setTodos(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    switch (sortMode) {
      case "ascending":
        handleSortAscending();
        break;
      case "descending":
        handleSortDescending();
        break;
    }
  }, [sortMode]);

  return (
    <div
      className="
     grid grid-cols-7 w-full text-lg my-[5px] px-[3%] py-[5px]
     border-b-2 border-last flex items-center
    "
    >
      <div className="col-span-2 flex relative gap-2 items-center">
        <div
          className="cursor-pointer flex
        items-center rounded-sm justify-center"
          title="filter"
        >
          <span
            className="bg-tertiary h-6 w-6 flex items-center justify-center rounded-sm p-[2px] text-white
            hover:bg-primary transition"
            onClick={() => {
              setShowFilter((show) => !show);
            }}
          >
            <TuneIcon />
          </span>
          {haveFiltered && (
            <div
              className="text-sm hover:bg-tertiary rounded-lg h-full
            flex items-center px-2 ml-1
            "
              onClick={() => {
                getAllTodos();
                setHaveFiltered(false);
              }}
            >
              Clear All
            </div>
          )}
        </div>
        <div className="font-bold">Tasks</div>
        {showFilter && <FilterPanel setHaveFiltered={setHaveFiltered} />}
      </div>
      <div className="font-bold">Priority</div>
      <div className="font-bold">Status</div>

      <div className="col-span-2 font-bold">Labels</div>
      <div className="flex relative gap-2">
        <span
          className="cursor-pointer 
          h-6 w-6 flex items-center justify-center bg-tertiary
          text-white hover:bg-primary rounded-sm p-[2px]"
          title="sort"
          onClick={() => setShowSort(true)}
        >
          <SortIcon />
        </span>
        <span className="font-bold">Due</span>
        {showSort && (
          <SortPanel setShowSort={setShowSort} setSortMode={setSortMode} />
        )}
      </div>
      <div>
        {/* <Button variant="contained" onClick={handleClick}>
        Add a Task
      </Button> */}
        <button
          className="absolute bottom-[100px] shadow-md p-[4px] rounded-lg
      bg-light-pink transition font-bold bg-tertiary text-white 
      hover:outline-none hover:ring-2 hover:ring-secondary hover:border-transparent
      hover:bg-primary hover:text-white cursor-pointer z-20"
          onClick={handleClick}
        >
          +Add a task
        </button>
      </div>
    </div>
  );
}
