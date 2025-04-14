import React, { useState, useEffect } from "react";
import MainBoard from "../components/MainBoard";
import AppNav from "../components/AppNav";
import BoardBar from "../components/BoardBar";
import Footer from "../components/Footer";
import AddTodo from "../components/AddTodo";
import { createContext } from "react";
import { useAuth } from "../AuthContext";
import { authApi } from "../axios";

export const todoContext = createContext();

export default function HomePage() {
  const { loading, user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [labels, setLabels] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [colors, setColors] = useState([
    "#FCA5A5",
    "#FCD34D",
    "#6EE7B7",
    "#93C5FD",
    "#A5B4FC",
    "#C4B5FD",
    "#F9A8D4",
    "#D1D5DB",
  ]);

  return (
    <todoContext.Provider
      value={{
        todos,
        setTodos,
        colors,
        setColors,
        labels,
        setLabels,
        showFilter,
        setShowFilter,
      }}
    >
      <div
        className="relative flex flex-col font-mono
       bg-tertiary h-screen w-screen gap-4"
      >
        {/* navigation bar */}
        <div
          className="w-screen
          bg-secondary text-white"
        >
          <AppNav />
        </div>

        {/* main board */}
        <div
          className=" flex flex-col 
        items-center justify-center flex-grow
        w-screen "
        >
          <div className="w-[95%] h-full shadow-lg rounded-lg">
            <div
              id="mainboard_table"
              className="w-full h-full rounded-lg overflow-y-auto divide-y divide-primary
              bg-rose-100
              "
            >
              <BoardBar setShowAdd={setShowAdd} />
              {showAdd ? <AddTodo setShowAdd={setShowAdd} /> : ""}
              {!loading && user ? <MainBoard user={user} /> : ""}
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="bg-secondary w-screen">
          <Footer />
        </div>
      </div>
    </todoContext.Provider>
  );
}
