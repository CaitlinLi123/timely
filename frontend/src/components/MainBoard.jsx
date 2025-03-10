import React, { useState } from 'react'
import Todo from './Todo'
import BoardBar from './BoardBar'
import { DataGrid } from '@mui/x-data-grid';

export default function MainBoard() {
  const [todos, setTodos] = useState([
    {
      "id":1,
      "type":"work",
      "description":"develop to do app",
      "priority":"medium",
      "status":"In Progress",
      "username":"yu"}
  ]);
  const columns = [
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  return (
    <div className='border-2 border-indigo-500 h-[400px] w-4/5'>
      {/* <BoardBar todos={todos} setTodos={setTodos}/>
      {
        todos.map(todo => (
           <Todo todo={todo}/>)
        )
      } */}
    <DataGrid rows={todos} columns={columns}/>
      
      
    </div>
  )
}
