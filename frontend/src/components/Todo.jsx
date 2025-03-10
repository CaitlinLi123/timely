import React, { useState } from 'react'

export default function Todo({todo}) {
  const [status, setStatus] = useState(todo["status"]);
  return (
    <div className='grid grid-cols-4 w-full border-3 border-black h-[30px]'>
      <div className='flex gap-3 justify-center'>
        {
          "description" in todo?<input type='checkbox'></input>:""
        }
        {/* <input type='text' placeholder={todo["description"]} className='text-black'></input> */}
        <div>{todo["description"]}</div>
        
        </div>
      <div>{todo["type"]}</div>
      <div className='flex justify-center'>
        <div className={
          `rounded-xl w-[150px] ${
            status === "In Progress" ? "bg-yellow-200" :
            status === "Complete" ? "bg-green-200" :
            status === "Pending"? "bg-red-200" : ""
          }`}>
          {status}
        </div>
        </div>
    </div>
  )
}
