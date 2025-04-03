import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import {deepPurple } from '@mui/material/colors';
import { useAuth } from '../AuthContext';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import tableIcon from "../assets/table.svg";
import ProfilePanel from './ProfilePanel';



export default function AppNav() {
  const navigate = useNavigate();
  const {user,loading} = useAuth();
  const [avatarLetter, setAvatarLetter] = useState("");
  const [showUserProfilePanel, setShowUserProfilePanel] = useState(false);

  useEffect(()=>{
    setAvatarLetter(user[0]);
  },[user])

  return (
    <div className='
    absolute top-0 left-0 py-3 px-4 z-10 
    w-full h-[6vh] grid grid-cols-4 
    bg-red-300 text-white border-b border-white'>
      <div className=' justify-self-start  text-2xl col-span-3'>To do list</div>
      <div className='grid grid-cols-2 divide-x place-content-center'>
        <button className='flex justify-center gap-2 items-center cursor-pointer'>
          <img src={tableIcon} alt="view icon" className='w-6 h-6'/>Views
          </button>
      {/* User Avatars: username's first letter */}
      <div className='relative justify-self-center flex items-center place-content-center gap-3'>
        {!loading &&
        <Avatar sx={{ bgcolor: deepPurple[500] }} 
        onClick={()=>{setShowUserProfilePanel(show=>!show)}}
        sizes='small'>{avatarLetter[0]}</Avatar>}

        {showUserProfilePanel && <ProfilePanel />}
      </div>
     
      </div>
    </div>
  )
}
