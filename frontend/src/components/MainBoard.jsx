import React, { useState } from 'react'
import Todo from './Todo'
import BoardBar from './BoardBar'
import { DataGrid } from '@mui/x-data-grid';
import PriorityBoard from './PriorityBoard';

export default function MainBoard() {
  // backend will do the filtering
  const [high,setHigh] = useState([
      {
      "id":1,
      "type":"work",
      "description":"develop to do app backend",
      "priority":"high",
      "status":"Pending",
      "date":"Today"},
  ])

  const [medium,setMedium] = useState([
    {
      "id":2,
      "type":"work",
      "description":"develop to do app frontend",
      "priority":"medium",
      "status":"In Progress",
      "date":"Today"},
])

const [low,setLow] = useState([
  {
    "id":3,
    "type":"life",
    "description":"go shopping",
    "priority":"low",
    "status":"Complete",
    "date":"Today"}
])
  // const columns = [
  //   { field: 'description', headerName: 'Description', width: 150 },
  //   { field: 'type', headerName: 'Type', width: 150 },
  //   { field: 'status', headerName: 'Status', width: 150 },
  // ];

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
