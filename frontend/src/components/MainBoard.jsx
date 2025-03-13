import React, { useContext, useEffect, useState } from 'react'
import Todo from './Todo'
import BoardBar from './BoardBar'
import { DataGrid } from '@mui/x-data-grid';
import PriorityBoard from './PriorityBoard';
import { todoContext } from '../page/HomePage';
import axios from 'axios';
import {useAuth} from "../AuthContext";

export default function MainBoard({user}) {
  // const columns = [
  //   { field: 'description', headerName: 'Description', width: 150 },
  //   { field: 'type', headerName: 'Type', width: 150 },
  //   { field: 'status', headerName: 'Status', width: 150 },
  // ];
  const {todos,setTodos} = useContext(todoContext);

  useEffect(()=>{
    if (!user) return;
    axios.get(`http://localhost:8000/task/todos/all/${user}`)
    .then(res=>{
      if(res.data){
        setTodos(res.data);
      }
    })
    .catch((e)=>{
      console.log(e);
    })
  },[user])

  //  const samplehigh= [
  //         {
  //         "id":1,
  //         "type":"work",
  //         "description":"develop to do app backend",
  //         "priority":"high",
  //         "status":"Pending",
  //         "date":"Today"},
  //     ]
    
  //     const samplemedium= [
  //       {
  //         "id":2,
  //         "type":"work",
  //         "description":"develop to do app frontend",
  //         "priority":"medium",
  //         "status":"In Progress",
  //         "date":"Today"},
  //   ]
    
  //   const samplelow = [
  //     {
  //       "id":3,
  //       "type":"life",
  //       "description":"go shopping",
  //       "priority":"low",
  //       "status":"Complete",
  //       "date":"Today"}
  //   ]

  //   useEffect(()=>{
  //     setHigh(samplehigh);
  //     setMedium(samplemedium);
  //     setLow(samplelow);
  //   },[])

  return (
    <div className='border-2 border-indigo-500 h-2/3 w-full'>
      {/* <BoardBar todos={todos} setTodos={setTodos}/>
      {
        todos.map(todo => (
           <Todo todo={todo}/>)
        )
      } */}
    {/* <DataGrid rows={todos} columns={columns}/> */}
      {todos? <PriorityBoard todos={todos} /> : "" }
      
    </div>
  )
}
