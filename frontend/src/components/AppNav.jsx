import React from 'react'
import Avatar from '@mui/material/Avatar';
import {deepPurple } from '@mui/material/colors';
import { useAuth } from '../AuthContext';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

export default function AppNav() {
  const navigate = useNavigate();
  const {user,loading} = useAuth();
  const handleLogout = ()=>{
    axios.get("http://localhost:5000/logout", { withCredentials: true })
    .then(res=>{
      alert(res.data);
      navigate("/login");
    })
    .catch((e)=>{
      console.log(e);
    })
  }

  return (
    <div className='
    
    border p-[10px] bg-red-300 left-[0px] w-full top-[0px]
    text-white
    grid grid-cols-6 grid-rows-1 items-center place-content-center'>
      <div className=' justify-self-start  text-2xl'>To do list</div>
      <div>Filter</div>
      <div>Search Bar</div>
      {/* User Avatars: username's first letter */}
      <div className='justify-self-center flex items-center place-content-center gap-3'>
        {loading === false ? <Avatar sx={{ bgcolor: deepPurple[500] }}>{user[0]}</Avatar>: 
        <Avatar sx={{ bgcolor: deepPurple[500] }}></Avatar>}
        
        <button className='cursor-pointer ' onClick={handleLogout}>Log out?</button>
      </div>
    </div>
  )
}
