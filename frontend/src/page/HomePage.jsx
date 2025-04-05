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
    <div className='relative border flex 
      px-5 bg-cream h-screen w-screen'>
      <div className="fixed h-[6vh] top-0 left-0 py-3 px-4 z-10 w-screen
          bg-coffee-100 text-white border-b border-white">
        <AppNav />
      </div>
        
        <div className=' flex flex-col items-center justify-center flex-grow pt-20 pb-16'>
          <div className='w-[85%] bg-white rounded-lg shadow-lg p-4'>
            <div id='mainboard_table' className='w-full h-[75vh] overflow-y-auto divide-y divide-gray-300'>
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
        <div className='fixed h-[3vh] left-0 bottom-0'>
          <Footer />
        </div>
        
    </div>
    </todoContext.Provider>
    
  )
}
