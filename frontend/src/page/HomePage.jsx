import React, { useEffect, useState } from 'react'
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
   const [todos,setTodos] = useState([]);
   const [labels,setLabels] = useState([]);

  const [showAdd, setShowAdd] = useState(false);
  const [colors,setColors] = useState([
    "#FCA5A5","#FCD34D","#6EE7B7","#93C5FD","#A5B4FC","#C4B5FD","#F9A8D4","#D1D5DB"
  ]);
  return (
    <todoContext.Provider value={{
      todos,setTodos,colors,setColors,labels,setLabels
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
