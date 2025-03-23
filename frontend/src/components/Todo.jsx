import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { todoContext } from '../page/HomePage';
import { useContext } from 'react';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import EditDes from './EditDes';

export default function Todo({todo}) {
   const [description, setDescription] = useState(todo.description);
    const [priority, setPriority] = useState(todo.priority);
    const [type, setType] = useState(todo.type);
    const [date, setDate] = useState(todo.date); // Format for date input
    const [status, setStatus] = useState(todo.status);

    const [hover,setHover] = useState(false);
    const [editDes, setEditDes] = useState(false);
  

  // const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDescriptionChange = ()=>{
    setEditDes(true);
  }

  // const handleDeleteClick = ()=>{
  //   setConfirmDelete(true);
  // }

  // const handleConfirmDeleteClick = ()=>{
  //   axios.delete(`http://localhost:8000/task/${todo.id}`).then(
  //     (res)=>{
  //       if(res.status==200){
  //         setTodos(todos=>todos.filter(td=>td.id!=todo.id));
  //         alert("success in deleting.");
  //       }else{
  //         alert("Something went wrong....",res.status);
  //       }
         
  //     }

  //   ).catch(e=>{
  //     console.log(e);
  //   })
  //   .finally(setConfirmDelete(false));
  // }

  // const {todos,setTodos} = useContext(todoContext);
  

  return (
    <div className='grid grid-cols-7 w-full h-[30px] 
    my-[0.5%] px-[3%]'>

      {/* edit? <EditTodo todo={todo} setTodos={setTodos} todos={todos} setEdit={setEdit}/> :  */}
       <div className='col-span-2 hover:bg-gray-200' 
        type='text' id="edittodo_description" name='description' 
        onChange={(e) => setDescription(e.target.value)}
        onMouseOver={()=>{setHover(true)}}
        onMouseOut={()=>{setHover(false)}}
        ><div>
           {description}
        {hover ? <EditIcon 
        className='cursor-pointer'
        onClick={handleDescriptionChange}/> : ""}
        </div>
         
        {editDes?<EditDes originalDesciption={description} setEditDes={setEditDes}/>:""}
        </div>
        <div>
            <select name="priority" id="edittodo_priority" value={priority}
            onChange={(e) => setPriority(e.target.value)}
            >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select> 
        </div>

   
        <select name="status" id="edittodo_status" value={status} 
        onChange={(e) => setStatus(e.target.value)}
        >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="complete">Complete</option>
        </select> 


        <input type='text' id="edittodo_type" name='type' value={type}  
        onChange={(e) => setType(e.target.value)}/>
        
        <input type="date" id="edittodo_date" name='date' value={date} 
        onChange={(e) => setDate(e.target.value)}
        // value={date ? date.split("T")[0] : "" }
        />
       
        <div>
        
        </div>
      
      
     
    </div>
  )
}
