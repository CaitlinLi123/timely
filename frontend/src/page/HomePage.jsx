import React, { useState } from 'react'
import MainBoard from "../components/MainBoard";
import AppNav from "../components/AppNav";
import BoardBar from '../components/BoardBar';
import Footer from '../components/Footer';
import AddTodo from '../components/AddTodo';

export default function HomePage() {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div className='flex flex-col p-5'>
      <AppNav />
      <BoardBar setShowAdd = {setShowAdd}/>
      {
        showAdd?<AddTodo />:""
      }
      
      <MainBoard />
      <Footer />
    </div>
  )
}
