import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useContext, useEffect, useState } from 'react';
import { todoContext } from '../page/HomePage';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import EditTodo from './EditTodo';

export default function AddTodo({setShowAdd}) {
    const {setTodos} = useContext(todoContext);
    const {user} = useAuth();

    const handleSubmit = ()=>{
        let description = document.getElementById("addtodo_description").value;
        let priority = document.getElementById("addtodo_priority").value;
        let type = document.getElementById("addtodo_type").value;
        let date = document.getElementById("addtodo_date").value;
        let status = document.getElementById("addtodo_status").value;
        const newTodo = {
            "description":description,
            "priority":priority,
            "type":type,
            "date":new Date(date),
            "status":status,
            "username":user
        }
        addNewTodo(newTodo);

        setTodos(todos=>[...todos,newTodo]);
        setShowAdd(false);
        
    }

    const addNewTodo = (newTodo)=>{
        axios.post("http://localhost:8000/task/todo", newTodo, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res=>{
            if(res.status===200){
                console.log(res.data);
                newTodo["id"] = res.data["id"];
                alert("success");
            }
        }).catch(e=>{
            console.log(e);
        })
    }
  return (
    <div className='grid grid-cols-7'>
        <input className='col-span-2' type='text' id="addtodo_description" name='description'/>
        <div>
            <select name="priority" id="addtodo_priority">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select> 
        </div>
        <input type='text' id="addtodo_type" name='type'/>
        <input type="date" id="addtodo_date" name='date'/>
        <div>
        <select name="status" id="addtodo_status">
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="complete">Complete</option>
        </select> 
        </div>
        <div>
        <button className='cursor-point' onClick={handleSubmit}>
                <AddIcon />
            </button>
            <button className='cursor-point'>
                <DeleteIcon />
            </button>
        </div>
    
    </div>
  )
}
