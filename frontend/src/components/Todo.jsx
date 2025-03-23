import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { todoContext } from '../page/HomePage';
import { useContext } from 'react';
import axios from 'axios';
import EditTodo from './EditTodo';

export default function Todo({todo}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [edit,setEdit] = useState(false);
  const handleEditClick = ()=>{
    setEdit(true);
  }
  const handleDeleteClick = ()=>{
    setConfirmDelete(true);
  }

  const handleConfirmDeleteClick = ()=>{
    axios.delete(`http://localhost:8000/task/${todo.id}`).then(
      (res)=>{
        if(res.status==200){
          setTodos(todos=>todos.filter(td=>td.id!=todo.id));
          alert("success in deleting.");
        }else{
          alert("Something went wrong....",res.status);
        }
         
      }

    ).catch(e=>{
      console.log(e);
    })
    .finally(setConfirmDelete(false));
  }

  const {todos,setTodos} = useContext(todoContext);
  

  return (
    <div className='grid grid-cols-7 w-full h-[30px]'>
      {edit? <EditTodo todo={todo} setTodos={setTodos} todos={todos} setEdit={setEdit}/> : <><div className='col-span-2'>{todo.description}</div>
     <div className=''>{todo.priority}</div>
     <div className=''>{todo.type}</div>
     <div className=''>{new Date(todo.date).toISOString().split('T')[0]}</div>
     <div className=''>{todo.status}</div>
     <div className=''>
      <button className='cursor-pointer' onClick={handleEditClick}>
         <EditIcon />
      </button>
       <button className='cursor-pointer' onClick={handleDeleteClick}>
         <DeleteIcon />
       </button>
     </div>
     <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${confirmDelete ? "flex" : "hidden"}`}>
        <div className='bg-white h-[100px] w-[300px] border-2 rounded-xl p-4 flex flex-col items-center justify-center'>
          <p>Are you sure you want to delete this task?</p>
          <div className="mt-4 flex gap-4">
            <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={handleConfirmDeleteClick}>Yes</button>
            <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setConfirmDelete(false)}>No</button>
          </div>
        </div>
      </div>
      
      </>}
     
    </div>
  )
}
