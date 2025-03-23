import React from 'react';
import Button from '@mui/material/Button';

export default function BoardBar({setShowAdd}) {
  const handleClick = ()=>{
    setShowAdd(true);
  }
  // const handleSubmit = ()=>{
  //   const emptyTodo =  {};
  //   setTodos(todos=>[...todos,emptyTodo]);
  // }

  return (
    <div className='grid grid-cols-7 w-full  text-lg my-[5px] px-[3%] py-[5px]'>
      <div className='col-span-2'>Tasks</div>
      <div>Priority</div>
      <div>Status</div>
      
      <div>Labels</div>
      <div>Due Date</div>
      <div >
      {/* <Button variant="contained" onClick={handleClick}>
        Add a Task
      </Button> */}
      <button className='fixed left-[100px] bottom-[100px] shadow-md p-[4px] rounded-lg
      bg-red-200
      hover:outline-none hover:ring-2 hover:ring-red-300 hover:border-transparent
      hover:bg-red-300 hover:text-white cursor-pointer' onClick={handleClick}
     
      >
        +Add a task</button>
      </div>
    </div>
  )
}
