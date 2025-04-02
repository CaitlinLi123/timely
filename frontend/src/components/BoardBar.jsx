import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import filterIcon from "../assets/filter.svg";
import sortIcon from "../assets/sort.svg";
import FilterPanel from './FilterPanel';
import { todoContext } from '../page/HomePage';

export default function BoardBar({setShowAdd}) {
  const handleClick = ()=>{
    setShowAdd(true);
  }
  // const handleSubmit = ()=>{
  //   const emptyTodo =  {};
  //   setTodos(todos=>[...todos,emptyTodo]);
  // }

  const {showFilter,setShowFilter} = useContext(todoContext);

  return (
    <div className='grid grid-cols-7 w-full  text-lg my-[5px] px-[3%] py-[5px]'>
      <div className='col-span-2 flex relative'>
        <button className='cursor-pointer' title='filter' onClick={()=>setShowFilter(show=>!show)}>
            <img src={filterIcon} className='w-6 h-6'/>
        </button>
        <button className='cursor-pointer' title='sort'>
                  <img src={sortIcon} className='w-6 h-6'/>
        </button>
        Tasks
        {showFilter && <FilterPanel />}
      </div>
      <div>Priority</div>
      <div>Status</div>
      
      <div className='col-span-2'>Labels</div>
      <div>Due Date</div>
      <div >
      {/* <Button variant="contained" onClick={handleClick}>
        Add a Task
      </Button> */}
      <button className='fixed left-[3%] bottom-[100px] shadow-md p-[4px] rounded-lg
      bg-red-200
      hover:outline-none hover:ring-2 hover:ring-red-300 hover:border-transparent
      hover:bg-red-300 hover:text-white cursor-pointer z-20' onClick={handleClick}
    
      >
        +Add a task</button>
      </div>
    </div>
  )
}
