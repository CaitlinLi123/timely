import React, { useState } from 'react'
import MainBoard from "../components/MainBoard";
import AppNav from "../components/AppNav";
import BoardBar from '../components/BoardBar';
import Footer from '../components/Footer';
import AddTodo from '../components/AddTodo';
import { useContext,createContext } from 'react';

export const todoContext = createContext();

export default function HomePage() {
   // backend will do the filtering
   const [high,setHigh] = useState(null);
   const [medium,setMedium] = useState(null);
   const [low,setLow] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  return (
    <todoContext.Provider value={{high,setHigh,
      medium,setMedium,
      low,setLow
    }}>
      <div className='flex flex-col p-5'>
      <AppNav />
      <BoardBar setShowAdd = {setShowAdd}/>
      {
        showAdd?<AddTodo />:""
      }
      
      <MainBoard setHigh={setHigh} setMedium = {setMedium} setLow={setLow}/>
      <Footer />
    </div>
    </todoContext.Provider>
    
  )
}
