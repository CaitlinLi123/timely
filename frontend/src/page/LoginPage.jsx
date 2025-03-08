import React, { use, useState } from 'react'
import axios from 'axios';

export default function LoginPage() {
    function getToken(user){
        axios.defaults.withCredentials=true;
        axios.post("http://localhost:5000/login",user)
        .then(response=>{
            console.log(response.data);
        });

    }
    function submit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const user = {
            "username":formData.get("username"),
            "password":formData.get("password")};
        getToken(user);
        
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
        <button type='submit'>Submit</button>
    </form>
  )
}
