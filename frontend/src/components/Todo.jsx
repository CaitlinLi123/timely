import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Todo({todo}) {
  const [status, setStatus] = useState(todo["status"]);
  const handleEditClick = ()=>{
    console.log("edit");
  }
  const handleDeleteClick = ()=>{
    console.log("delete");
  }
  return (
    <div className='grid grid-cols-7 w-full h-[30px]'>
     <div className='col-span-2'>{todo.description}</div>
     <div className=''>{todo.priority}</div>
     <div className=''>{todo.type}</div>
     <div className=''>{todo.date}</div>
     <div className=''>{todo.status}</div>
     <div className=''>
      <button className='cursor-point' onClick={handleEditClick}>
         <EditIcon />
      </button>
       <button className='cursor-point' onClick={handleDeleteClick}>
         <DeleteIcon />
       </button>
       
     </div>
    </div>
  )
}
