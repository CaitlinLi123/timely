import React, { useState, useContext, useEffect, createContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDes from "./EditDes";
import EditLabels from "./EditLabels";
import { todoContext } from "../page/HomePage";
import { todoApi } from "../axios";

// export const labelContext = createContext();
export const editContext = createContext();

export default function Todo({ todo }) {
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState(todo.priority);
  const [usedLabels, setUsedLabels] = useState(todo.labels);
  const [date, setDate] = useState(todo.date); // Format for date input
  const [status, setStatus] = useState(todo.status);

  const [hover, setHover] = useState(false);
  const [editDes, setEditDes] = useState(false);
  const [editLabels, setEditLabels] = useState(false);
  // const [confirmDelete, setConfirmDelete] = useState(false);
  const [priorityColor, setPriorityColor] = useState("text-green-500");

  const handleDescriptionChange = () => {
    setEditDes(true);
  };

  // const handleDeleteClick = ()=>{
  //   setConfirmDelete(true);
  // }

  // const handleConfirmDeleteClick = ()=>{
  //   axios.delete(`http://localhost:8000/task/${todo.id}`).then(
  //     (res)=>{
  //       if(res.status==200){
  //         setTodos(todos=>todos.filter(td=>td.id!=todo.id));
  //         alert("success in deleting.");
  //       }else{
  //         alert("Something went wrong....",res.status);
  //       }

  //     }

  //   ).catch(e=>{
  //     console.log(e);
  //   })
  //   .finally(setConfirmDelete(false));
  // }

  // const {todos,setTodos} = useContext(todoContext);

  const handleClickLabels = () => {
    setEditLabels(true);
  };

  const handleDateChange = (newDate) => {
    todoApi
      .patch(
        `/todo/${todo.id}/date`,
        JSON.stringify(new Date(newDate).toISOString()),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setDate(res.data.date);
          // alert("succeed to update date");
        } else {
          alert("fail to update date");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePriorityChange = (newPriority) => {
    todoApi
      .patch(`/todo/${todo.id}/priority`, JSON.stringify(newPriority), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setPriority(res.data.priority);
          // alert("succeed to update priority");
        } else {
          alert("fail to update date");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleStatusChange = (newStatus) => {
    todoApi
      .patch(`/todo/${todo.id}/status`, JSON.stringify(newStatus), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setStatus(res.data.status);
          // alert("succeed to update date");
        } else {
          alert("fail to update status");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // useEffect(()=>{
  //   console.log(date);
  // },[date])

  return (
    <editContext.Provider
      value={{
        editLabels,
        setEditLabels,
        description,
        setDescription,
        priority,
        setPriority,
        usedLabels,
        setUsedLabels,
        date,
        setDate,
        status,
        setStatus,
      }}
    >
      <div
        className="relative grid grid-cols-7 w-full justify-items-start text-left
    my-[0.5%] px-[3%]"
        key={`todo_${todo.id}`}
      >
        <div
          className="flex col-span-2 transition hover:bg-quaternary 
          justify-items-start text-left rounded-lg gap-2"
          type="text"
          id="edittodo_description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          onMouseOver={() => {
            setHover(true);
          }}
          onMouseOut={() => {
            setHover(false);
          }}
        >
          <div className="flex items-center">
            {hover ? (
              <div className="text-white">
                <span title="delete this task">
                  <DeleteIcon className="cursor-pointer" />
                </span>
                <span title="edit the description">
                  <EditIcon
                    className="cursor-pointer"
                    onClick={handleDescriptionChange}
                  />
                </span>
              </div>
            ) : (
              ""
            )}
            {description}
          </div>

          <div className="absolute top-full left-0 w-full z-50">
            {editDes ? (
              <EditDes
                description={description}
                setEditDes={setEditDes}
                key={`editDesc_${todo.id}`}
                todoid={todo.id}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex align-center justify-center">
          <select
            name="priority"
            id="edittodo_priority"
            value={priority.toLowerCase()}
            onChange={(e) => {
              handlePriorityChange(e.target.value.toUpperCase());
            }}
            className={`${
              priority == "HIGH"
                ? "text-red-700"
                : priority == "MEDIUM"
                  ? "text-blue-700"
                  : "text-green-700"
            } rounded-lg`}
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
            console.log(e.target.value.toUpperCase());
            handleStatusChange(e.target.value.toUpperCase());
          }}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">🎉 Completed</option>
        </select>

        <div className="col-span-2 relative left-2 mr-2">
          <div
            id="edittodo_labels"
            className="
              cursor-pointer flex flex-wrap gap-2"
            onClick={handleClickLabels}
          >
            <div
              className="rounded-full bg-gray-100 h-5 w-5 cursor-pointer hover:bg-gray-200
                flex justify-center items-center"
              onClick={handleClickLabels}
            >
              +
            </div>

            {usedLabels.map((usedLabel) => (
              <div
                className="rounded-md px-2 text-sm place-content-center"
                key={`usedlabels_${usedLabel.id}`}
                style={{ backgroundColor: usedLabel.color }}
              >
                {usedLabel.name}
              </div>
            ))}
          </div>
          {editLabels === true ? (
            <EditLabels key={`editlabels_${todo.id}`} todoid={todo.id} />
          ) : null}
        </div>

        <input
          type="date"
          id="edittodo_date"
          name="date"
          onChange={(e) => {
            handleDateChange(e.target.value);
          }}
          value={date ? date.split("T")[0] : ""}
        />
      </div>
    </editContext.Provider>
  );
}
