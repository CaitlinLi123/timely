import React from 'react'
import Avatar from '@mui/material/Avatar';
import {deepPurple } from '@mui/material/colors';
import { useAuth } from '../AuthContext';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import tableIcon from "../assets/table.svg";



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
    fixed top-0 left-0 py-3 px-4 z-10 
    w-full h-[6vh] grid grid-cols-4 
    bg-red-300 text-white '>
      <div className=' justify-self-start  text-2xl col-span-3'>To do list</div>
      <div className='grid grid-cols-2 divide-x place-content-center'>
        <button className='flex justify-center gap-2 items-center cursor-pointer'>
          <img src={tableIcon} alt="view icon" className='w-6 h-6'/>Views
          </button>
      {/* User Avatars: username's first letter */}
      <div className='justify-self-center flex items-center place-content-center gap-3'>
        {loading === false ? <Avatar sx={{ bgcolor: deepPurple[500] }}>{user[0]}</Avatar>: 
        <Avatar sx={{ bgcolor: deepPurple[500] }} sizes='small'></Avatar>}
        
        {/* <button className='cursor-pointer ' onClick={handleLogout}>Log out?</button> */}
      </div>
     
      </div>
    </div>
  )
}
