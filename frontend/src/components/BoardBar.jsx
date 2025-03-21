import React from 'react';
import Button from '@mui/material/Button';

export default function BoardBar({setShowAdd}) {
  const handleClick = ()=>{
    setShowAdd(true);
  }
  const handleSubmit = ()=>{
    const emptyTodo =  {};
    setTodos(todos=>[...todos,emptyTodo]);
  }

  return (
    <div className='grid grid-cols-7 w-full divide-x text-lg'>
      <div className='col-span-2'>Tasks</div>
      <div>Priority</div>
      <div>Type</div>
      
      <div>Date</div>
      <div>Status</div>
      <div onClick={handleClick}
      className='
      cursor-pointer 
      justify-center'>
      <Button variant="contained" onClick={handleClick}>
        Add a Task
      </Button>
      </div>
    </div>
  )
}
