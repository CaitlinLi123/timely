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
   const [todos,setTodos] = useState([]);
   const [labels,setLabels] = useState([]);
   const [showFilter,setShowFilter] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [colors,setColors] = useState([
    "#FCA5A5","#FCD34D","#6EE7B7","#93C5FD","#A5B4FC","#C4B5FD","#F9A8D4","#D1D5DB"
  ]);
  return (
    <todoContext.Provider value={{
      todos,setTodos,colors,setColors,labels,setLabels,showFilter,setShowFilter
    }}>
    <div className='relative border
      p-5 flex flex-col 
      bg-red-200 min-h-screen
    min-w-screen'>
        <AppNav />
        <div className='flex flex-col items-center justify-center flex-grow pt-20 pb-16'>
          <div className='w-[100%] bg-white rounded-lg shadow-lg p-4'>
            <div id='mainboard_table' className='w-full min-h-[80vh] overflow-y-auto divide-y divide-gray-300'>
          <BoardBar setShowAdd = {setShowAdd}/>
          {
            showAdd?<AddTodo setShowAdd = {setShowAdd}/>:""
          }
          {
              !loading&&user? <MainBoard user={user}/> : ""
          } 
        </div>
        </div>
        </div>
        
        <Footer />
    </div>
    </todoContext.Provider>
    
  )
}
