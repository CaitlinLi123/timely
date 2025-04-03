import React, { useContext, useEffect, useState } from 'react';
import filterIcon from "../assets/filter.svg";
import sortIcon from "../assets/sort.svg";
import FilterPanel from './FilterPanel';
import { todoContext } from '../page/HomePage';
import SortPanel from './SortPanel';

export default function BoardBar({setShowAdd}) {
  const [showSort, setShowSort] = useState(false);
  const [sortMode,setSortMode] = useState(null);
  const handleClick = ()=>{
    setShowAdd(true);
  }
  const handleSortDescending = ()=>{
    const sorted = [...todos].sort((t1, t2) => new Date(t1.date) - new Date(t2.date));
    setTodos(sorted); // Ensure you update the state
  }

  const handleSortAscending = ()=>{
    const sorted = [...todos].sort((t1, t2) => new Date(t2.date) - new Date(t1.date));
    setTodos(sorted); // Ensure you update the state
  }

  // const sortById = ()=>{
  //    const sorted = [...todos].sort((t1, t2) => t1.id - t2.id);
  //   setTodos(sorted); // Ensure you update the state
  // }

  const {showFilter,setShowFilter,todos,setTodos} = useContext(todoContext);

  useEffect(()=>{
    switch(sortMode){
      case "ascending":
        handleSortAscending();
        break;
      case "descending":
        handleSortDescending();
        break;
    }
  },[sortMode]);

  return (
    <div className='grid grid-cols-7 w-full  text-lg my-[5px] px-[3%] py-[5px]'>
      <div className='col-span-2 flex relative'>
        <button className='cursor-pointer' title='filter' onClick={()=>setShowFilter(show=>!show)}>
            <img src={filterIcon} className='w-6 h-6'/>
        </button>
        {/* <button className='cursor-pointer' title='sort'>
                  <img src={sortIcon} className='w-6 h-6'/>
        </button> */}
        Tasks
        {showFilter && <FilterPanel />}
      </div>
      <div>Priority</div>
      <div>Status</div>
      
      <div className='col-span-2'>Labels</div>
      <div className='flex relative'>
         <button className='cursor-pointer' title='sort' onClick={()=>setShowSort(true)}>
                  <img src={sortIcon} className='w-6 h-6'/>
        </button>
        Due Date
        {showSort && <SortPanel setShowSort={setShowSort} 
        setSortMode={setSortMode}
        />}
        </div>
      <div>
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
