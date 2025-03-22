import React, { use, useState } from 'react'
import {authApi} from '../axios';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function LoginPage() {
    const navigate = useNavigate();
    const {validate} = useAuth();
    async function getToken(user){
        try {
            const response = await axios.post("http://localhost:5000/login", user, { withCredentials: true });
           if(response.status == 200){
            alert("login successful");
            validate();
            navigate("/");
           }
        } catch (error) {
            alert(error);
        }
        

    }
    function submit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const user = {
            "username":formData.get("username"),
            "password":formData.get("password")};
        getToken(user);
        
    }

    const handleClick = ()=>{
        navigate("/register");    
    }
  return (
    <form onSubmit={submit}>
        <div className='justify-between border-4 border-indigo-500'>
            <p className='indigo-500'>Username:</p>
            <input name="username" type='text' className='border-4 border-indigo-500'></input>
        </div>
        <div className='justify-between border-4 border-indigo-500'>
        <p className=''>Password:</p>
            <input name="password" type='text' className='border-4 border-indigo-500'></input>
        </div>
        <button type='submit' className='rounded-xl bg-indigo-600 cursor-pointer'>Submit</button>
        <p onClick={handleClick} className='cursor-pointer'>New user? Register here</p>
    </form>
  )
}
