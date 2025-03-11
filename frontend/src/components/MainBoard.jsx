import React, { useContext, useEffect, useState } from 'react'
import Todo from './Todo'
import BoardBar from './BoardBar'
import { DataGrid } from '@mui/x-data-grid';
import PriorityBoard from './PriorityBoard';
import { todoContext } from '../page/HomePage';

export default function MainBoard() {
  // const columns = [
  //   { field: 'description', headerName: 'Description', width: 150 },
  //   { field: 'type', headerName: 'Type', width: 150 },
  //   { field: 'status', headerName: 'Status', width: 150 },
  // ];
  const {setHigh,setLow,setMedium} = useContext(todoContext);

   const high= [
          {
          "id":1,
          "type":"work",
          "description":"develop to do app backend",
          "priority":"high",
          "status":"Pending",
          "date":"Today"},
      ]
    
      const medium= [
        {
          "id":2,
          "type":"work",
          "description":"develop to do app frontend",
          "priority":"medium",
          "status":"In Progress",
          "date":"Today"},
    ]
    
    const low = [
      {
        "id":3,
        "type":"life",
        "description":"go shopping",
        "priority":"low",
        "status":"Complete",
        "date":"Today"}
    ]

    useEffect(()=>{
      setHigh(high);
      setMedium(medium);
      setLow(low);
    },[])

  return (
    <div className='border-2 border-indigo-500 h-2/3 w-full'>
      {/* <BoardBar todos={todos} setTodos={setTodos}/>
      {
        todos.map(todo => (
           <Todo todo={todo}/>)
        )
      } */}
    {/* <DataGrid rows={todos} columns={columns}/> */}
      {
        [high,medium,low].map(
          todos=><PriorityBoard todos={todos} /> 
        )
      }
      
    </div>
  )
}
