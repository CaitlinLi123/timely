import React, { useContext, useEffect, useState } from 'react';
import filterIcon from "../assets/filter.svg";
import sortIcon from "../assets/sort.svg";
import FilterPanel from './FilterPanel';
import { todoContext } from '../page/HomePage';
import SortPanel from './SortPanel';
import { todoApi } from '../axios';
import { useAuth } from '../AuthContext';

export default function BoardBar({setShowAdd}) {
  const [showSort, setShowSort] = useState(false);
  const [sortMode,setSortMode] = useState(null);
  const [haveFiltered,setHaveFiltered] = useState(false);
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
  const {user} = useAuth();

  const getAllTodos = ()=>{
     todoApi.get(`/todos/all/${user}`)
        .then(res=>{
          if(res.data){
            setTodos(res.data);
          }
        })
        .catch((e)=>{
          console.log(e);
        })
  }

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
      <div className='col-span-2 flex relative gap-2'>
        <div className='cursor-pointer flex
        items-center rounded-sm bg-gray-100 
        border border-gray-100 ' title='filter'>
            <img src={filterIcon} className='w-6 h-full hover:bg-gray-200 p-[2px]' 
            onClick={()=>{setShowFilter(show=>!show)}}/>
            {haveFiltered && <div className='text-sm hover:bg-gray-200 h-full
            flex items-center px-2
            ' onClick={()=>{
              getAllTodos();
              setHaveFiltered(false)}}>Clear All</div>}
        </div>
        <div>Tasks</div>
        {showFilter && <FilterPanel setHaveFiltered={setHaveFiltered}/>}
      </div>
      <div>Priority</div>
      <div>Status</div>
      
      <div className='col-span-2'>Labels</div>
      <div className='flex relative gap-2'>
         <button className='cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-sm p-[2px]' title='sort' onClick={()=>setShowSort(true)}>
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
      <button className='absolute left-[10%] bottom-[100px] shadow-md p-[4px] rounded-lg
      bg-light-pink transition font-bold
      hover:outline-none hover:ring-2 hover:ring-red-400 hover:border-transparent
      hover:bg-red-400 hover:text-white cursor-pointer z-20' onClick={handleClick}
      >
        +Add a task</button>
      </div>
    </div>
  )
}
