import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import { todoContext } from "../page/HomePage";
import { useAuth } from "../AuthContext";
import { todoApi } from "../axios";

export default function AddTodo({ setShowAdd }) {
  const { setTodos } = useContext(todoContext);
  const { user } = useAuth();
  const [description, setDescription] = useState("Your task description");
  const [priority, setPriority] = useState("HIGH");
  const [date, setDate] = useState(new Date().toISOString()); // Format for date input
  const [status, setStatus] = useState("PENDING");

  const handleSubmit = () => {
    const newTodo = {
      description: description,
      priority: priority,
      labels: [],
      date: new Date(date),
      status: status,
      username: user.username,
    };
    addNewTodo(newTodo);
    setShowAdd(false);
  };

  const addNewTodo = (newTodo) => {
    todoApi
      .post("/", newTodo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          setTodos((todos) => [...todos, res.data]);
          alert("success");
        } else {
          console.log(res);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div
      className="relative grid grid-cols-7 w-full justify-items-start text-left
    my-[0.5%] px-[3%]"
      key={`todo_addtodo`}
    >
      <button
        onClick={handleSubmit}
        className="absolute left-[0%] cursor-pointer"
      >
        <AddIcon />
      </button>
      <input
        className="flex col-span-2 hover:bg-gray-200 justify-items-start text-left"
        type="text"
        id="edittodo_description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex align-center justify-center">
        <select
          name="priority"
          id="edittodo_priority"
          value={priority.toLowerCase()}
          onChange={(e) => {
            setPriority(e.target.value.toUpperCase());
          }}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <select
        name="status"
        id="edittodo_status"
        value={status.toLowerCase()}
        onChange={(e) => {
          // console.log(e.target.value.toUpperCase());
          setStatus(e.target.value.toUpperCase());
        }}
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Complete</option>
      </select>

      <div className="col-span-2 relative">
        <div
          id="edittodo_labels"
          className="
             flex gap-2 flex-wrap"
        ></div>
      </div>

      <input
        type="date"
        id="edittodo_date"
        name="date"
        // value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
        value={date ? date.split("T")[0] : ""}
      />
    </div>
  );
}
