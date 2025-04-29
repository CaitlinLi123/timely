import React, { useContext, useEffect } from "react";
import Todo from "./Todo";
import { todoContext } from "../page/HomePage";
import { todoApi, labelApi } from "../axios";
import BoardBar from "./BoardBar";
import AddTodo from "./AddTodo";

export default function MainBoard({ user, setShowAdd, showAdd }) {
  // const columns = [
  //   { field: 'description', headerName: 'Description', width: 150 },
  //   { field: 'type', headerName: 'Type', width: 150 },
  //   { field: 'status', headerName: 'Status', width: 150 },
  // ];
  const { todos, setTodos, labels, setLabels } = useContext(todoContext);

  useEffect(() => {
    if (!user) return;
    todoApi
      .get(`/user/${user.username}`)
      .then((res) => {
        if (res.data) {
          setTodos(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    labelApi
      .get(`/user/${user.username}`)
      .then((res) => {
        setLabels(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user]);

  return (
    <div className="" key={"mainboard"}>
      {/* <BoardBar todos={todos} setTodos={setTodos}/>
      {
        todos.map(todo => (
           <Todo todo={todo}/>)
        )
      } */}
      {/* {todos? <PriorityBoard todos={todos} /> : "" } */}
      <BoardBar setShowAdd={setShowAdd} />
      {showAdd ? <AddTodo setShowAdd={setShowAdd} /> : ""}
      <ul className="divide-y divide-primary/30 divide-opacity-100">
        {todos != null
          ? todos.map((todo) => (
              <li key={todo.id}>
                <Todo todo={todo} key={todo.id} />
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
}
