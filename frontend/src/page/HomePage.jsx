import React, { useState } from 'react'
import MainBoard from "../components/MainBoard";
import AppNav from "../components/AppNav";
import BoardBar from '../components/BoardBar';
import Footer from '../components/Footer';
import AddTodo from '../components/AddTodo';
import { createContext } from 'react';
import { useAuth } from '../AuthContext';

export const todoContext = createContext();

export default function HomePage() {
  const {loading,user} = useAuth();
   const [todos,setTodos] = useState(
    [
      // {
      //   "description": "Implement authentication system",
      //   "Progress": "To-Do",
      //   "type": "Backend",
      //   "priority": "High",
      //   "date": "Mar 30"
      // },
      // {
      //   "description": "Design homepage layout",
      //   "status": "To-Do",
      //   "type": "",
      //   "priority": "Medium",
      //   "date": ""
      // },
      // {
      //   "description": "Set up CI/CD pipeline",
      //   "status": "Doing",
      //   "type": "DevOps",
      //   "priority": "High",
      //   "date": "Apr 5"
      // },
      // {
      //   "description": "Write unit tests",
      //   "status": "Doing",
      //   "type": "",
      //   "priority": "Medium",
      //   "date": ""
      // },
      // {
      //   "description": "Fix login page bug",
      //   "status": "To-Do",
      //   "type": "Bug",
      //   "priority": "High",
      //   "date": "Mar 28"
      // },
      // {
      //   "description": "Update API documentation",
      //   "status": "Done",
      //   "type": "",
      //   "priority": "Low",
      //   "date": ""
      // },
      // {
      //   "description": "Deploy application to production",
      //   "Progress": "Done",
      //   "type": "Release",
      //   "priority": "High",
      //   "date": "Mar 22"
      // }
    ]
   );

  const [showAdd, setShowAdd] = useState(false);
  const [colors,setColors] = useState([
    "#FCA5A5","#FCD34D","#6EE7B7","#93C5FD","#A5B4FC","#C4B5FD","#F9A8D4","#D1D5DB"
  ]);
  return (
    <todoContext.Provider value={{
      todos,setTodos,colors,setColors
    }}>
      <div className='fixed 
      flex flex-col p-5 
      bg-red-200 
      h-full w-full'>
      <AppNav />
      <div className='rounded-lg
      h-full w-[4/5] bg-white
      shadow-lg 
      my-[10px]'>
        <div id='mainboard_table' className='
        w-[94%] mx-[3%] mt-[20px]
      divide-y divide-gray-300  divide-opacity-100'>
       <BoardBar setShowAdd = {setShowAdd}/>
      {
        showAdd?<AddTodo setShowAdd = {setShowAdd}/>:""
      }
      {
          !loading&&user? <MainBoard user={user}/> : ""
      } 
      </div>
      </div>
      <Footer />
    </div>
    </todoContext.Provider>
    
  )
}
