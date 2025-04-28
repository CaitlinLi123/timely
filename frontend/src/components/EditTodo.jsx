import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { todoApi } from "../axios";

export default function EditTodo({ todo, todos, setTodos, setEdit }) {
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState(todo.priority);
  const [type, setType] = useState(todo.type);
  const [date, setDate] = useState(todo.date); // Format for date input
  const [status, setStatus] = useState(todo.status);

  const handleSubmit = (todo) => {
    let updatedTodo = {
      ...todo,
      description,
      priority,
      type,
      date: new Date(date), // Convert to Date object
      status,
    };

    // send the put request
    editTodo(updatedTodo);
  };

  const editTodo = (newTodo) => {
    console.log(newTodo);
    todoApi
      .put(`/${newTodo.id}`, newTodo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          const updatedTodos = todos.map((td) =>
            td.id === todo.id ? res.data : td
          );
          setTodos(updatedTodos);
          setEdit(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <input
        className="col-span-2"
        type="text"
        id="edittodo_description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div>
        <select
          name="priority"
          id="edittodo_priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <input
        type="text"
        id="edittodo_type"
        name="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="date"
        id="edittodo_date"
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        // value={date ? date.split("T")[0] : "" }
      />
      <div>
        <select
          name="status"
          id="edittodo_status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="complete">Complete</option>
        </select>
      </div>
      <div>
        <button
          className="cursor-pointer"
          onClick={() => {
            handleSubmit(todo);
          }}
        >
          <AddIcon />
        </button>
        <button className="cursor-pointer">
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
