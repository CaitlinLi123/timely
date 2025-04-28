import React, { useContext, useState } from "react";
import { todoContext } from "../page/HomePage";
import { useAuth } from "../AuthContext";
import { todoApi } from "../axios";
import CloseIcon from "@mui/icons-material/Close";

export default function FilterPanel({ setHaveFiltered }) {
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterDue, setFilterDue] = useState([]);
  const [filterPriority, setFilterPriority] = useState([]);
  const [filterLabels, setFilterLabels] = useState([]);
  const { labels, setTodos, setShowFilter } = useContext(todoContext);
  const { user } = useAuth();

  const handleSubmit = () => {
    const filter = {
      status: filterStatus,
      due: filterDue,
      priority: filterPriority,
      labels: filterLabels,
      username: user.username,
    };
    console.log(filter);
    todoApi
      .post("/filter", filter)
      .then((res) => {
        if (res.status == 200) {
          setTodos(res.data);
          setHaveFiltered(true);
        } else {
          console.log(res);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleClear = () => {
    setFilterStatus([]);
    setFilterDue([]);
    setFilterPriority([]);
    setFilterLabels([]);
  };
  return (
    <div
      className="absolute bg-white top-[100%]
    z-30 rounded-lg w-[300px] shadow-xl border border-gray-200"
    >
      <div
        className="overflow-y-auto relative
      items-center py-2"
      >
        {/* title */}
        <div
          className="w-full py-1 px-2 text-center 
        border-b border-b-gray-300"
        >
          <span
            className="absolute flex 
          w-6 h-6 rounded-full right-2
          cursor-pointer hover:bg-tertiary hover:text-white transition
          "
            onClick={() => setShowFilter(false)}
          >
            <CloseIcon />
          </span>

          <div className="font-bold text-xl">Filter</div>
        </div>
        {/* status */}
        <div className="w-full py-1 px-2 border-b border-gray-300">
          <div className="font-bold">Status</div>
          <div>
            {["Pending", "In_Progress", "Completed"].map((s) => (
              <div key={`filter_status_${s}`} className="flex gap-2">
                <input
                  type="checkbox"
                  id={`filter_status_checkbox_${s}`}
                  name={s}
                  value={s}
                  checked={filterStatus.some(
                    (status) => status === s.toUpperCase()
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilterStatus((status_array) => [
                        ...status_array,
                        e.target.value.toUpperCase(),
                      ]);
                    } else {
                      setFilterStatus((status_array) =>
                        status_array.filter(
                          (s) => s !== e.target.value.toUpperCase()
                        )
                      );
                    }
                  }}
                />
                <label htmlFor={s} className="px-2 text-md">
                  {" "}
                  {s.replace("_", " ")}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* due date */}
        <div className="w-full py-1 px-2 border-b border-gray-300">
          <div className="font-bold">Due Date</div>
          <div>
            {[
              "Overdue",
              "Due In Next Day",
              "Due In Next Week",
              "Due In Next Month",
            ].map((due) => (
              <div key={`filter_due_${due}`} className="flex gap-2">
                <input
                  type="checkbox"
                  id={`filter_due_checkbox_${due}`}
                  name={due}
                  value={due.replace(/\s/g, "")}
                  checked={filterDue.some((d) => d === due.replace(/\s/g, ""))}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilterDue((due_array) => [
                        ...due_array,
                        e.target.value,
                      ]);
                    } else {
                      setFilterDue((due_array) =>
                        due_array.filter((d) => d !== e.target.value)
                      );
                    }
                  }}
                />
                <label htmlFor={due} className="px-2 text-md">
                  {" "}
                  {due}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* priority */}
        <div className="w-full py-1 px-2 border-b border-gray-300">
          <div className="font-bold">Priority</div>
          <div>
            {["High", "Medium", "Low"].map((priority) => (
              <div key={`filter_priority_${priority}`} className="flex gap-2">
                <input
                  type="checkbox"
                  id={`filter_priority_checkbox_${priority}`}
                  name={priority}
                  value={priority}
                  checked={filterPriority.some(
                    (p) => p === priority.toUpperCase()
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilterPriority((priority_array) => [
                        ...priority_array,
                        e.target.value.toUpperCase(),
                      ]);
                    } else {
                      setFilterPriority((priority_array) =>
                        priority_array.filter(
                          (p) => p !== e.target.value.toUpperCase()
                        )
                      );
                    }
                  }}
                />
                <label htmlFor={priority} className="px-2 text-md">
                  {" "}
                  {priority}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* labels */}
        <div className="w-full pt-1 pb-2 px-2 border-b border-gray-300">
          <div className="font-bold">Labels</div>
          <div className="flex flex-wrap gap-2">
            {labels
              ? labels.map((label) => (
                  <div key={label.id} className="flex gap-2">
                    <input
                      type="checkbox"
                      id={label.name}
                      name={label.name}
                      value={label.name}
                      checked={filterLabels.some(
                        (tmpLabel) => tmpLabel === label.id
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilterLabels((label_arr) => [
                            ...label_arr,
                            label.id,
                          ]);
                        } else {
                          setFilterLabels((label_arr) =>
                            label_arr.filter((l) => l != label.id)
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={label.name}
                      style={{ backgroundColor: label.color }}
                      className="px-2 rounded-lg"
                    >
                      {" "}
                      {label.name}
                    </label>
                  </div>
                ))
              : null}
          </div>
        </div>
        {/* submit and clear */}
        <div className="w-full sticky bottom-0 py-1 px-2">
          <div className="flex justify-between w-full px-3 py-2">
            <button
              className="bg-tertiary hover:bg-primary hover:text-white
              font-bold cursor-pointer
              rounded-lg px-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="bg-tertiary hover:bg-primary hover:text-white
              cursor-pointer
              font-bold rounded-lg px-2"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
