import React from 'react'
import axios from '../axios';

export default function RegisterPage() {
    async function getToken(user){
        try {
            const response = await axios.post("http://localhost:5000/register", user);
           if(response.status == 200){
            alert("Register successful");
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
    </form>
  )
}
