import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useContext, useEffect, useState } from 'react';
import { todoContext } from '../page/HomePage';
import { useAuth } from '../AuthContext';
import axios from 'axios';

export default function EditTodo({todo,todos,setTodos}) {
    console.log(todo);
    const handleSubmit = (todo) =>{
        const updatedTodo = {
            ...todo,
            description: document.getElementById("edittodo_description").value,
            priority: document.getElementById("edittodo_priority").value,
            type: document.getElementById("edittodo_type").value,
            date: document.getElementById("edittodo_date").value,
            status: document.getElementById("edittodo_status").value
        };
        
        // addNewTodo(newTodo);
        const updatedTodos = todos.map(td => td.id === todo.id ? updatedTodo : td);

        setTodos(updatedTodos);
        // setShowAdd(false);
    }

    const editTodo = (newTodo)=>{
        axios.put(`http://localhost:8000/task/${newTodo.id}`, newTodo, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res=>{
            if(res.status===200){
                alert("success");
            }
        }).catch(e=>{
            console.log(e);
        })
    }
  return (
    <>
        <input className='col-span-2' type='text' id="edittodo_description" name='description' value={todo.description}/>
        <div>
            <select name="priority" id="edittodo_priority">
                <option value="high" selected={todo.priority === "high" ? "selected" : ""}>High</option>
                <option value="medium" selected={todo.priority === "medium" ? "selected" : ""}>Medium</option>
                <option value="low" selected={todo.priority === "low" ? "selected" : ""}>Low</option>
            </select> 
        </div>
        <input type='text' id="edittodo_type" name='type' value={todo.type}/>
        <input type="date" id="edittodo_date" name='date' value={todo.date ? todo.date.split("T")[0] : "" }/>
        <div>
        <select name="status" id="edittodo_status">
            <option value="pending" selected={todo.status === "pending" ? "selected" : ""}>Pending</option>
            <option value="in_progress" selected={todo.status === "in progress" ? "selected" : ""}>In Progress</option>
            <option value="complete" selected={todo.status === "complete" ? "selected" : ""}>Complete</option>
        </select> 
        </div>
        <div>
        <button className='cursor-pointer' onClick={()=>{handleSubmit(todo)}}>
                <AddIcon />
            </button>
            <button className='cursor-pointer'>
                <DeleteIcon />
            </button>
        </div>
        
    </>
  )
}
