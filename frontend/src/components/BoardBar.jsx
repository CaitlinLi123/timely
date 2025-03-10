import React from 'react'

export default function BoardBar({todos,setTodos}) {
  const handleClick = ()=>{
    const emptyTodo =  {};
    setTodos(todos=>[...todos,emptyTodo]);
  }
  return (
    <div className='flex grid grid-cols-4'>
      <div>Tasks</div>
      <div>Type</div>
      <div>Status</div>
      <button onClick={handleClick}
      className='
      cursor-pointer 
      rounded-full border-2 border-black w-[20px]  justify-items-center'>+</button>
    </div>
  )
}
