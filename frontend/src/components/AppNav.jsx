import React from 'react'
import Avatar from '@mui/material/Avatar';
import {deepPurple } from '@mui/material/colors';

export default function AppNav() {
  return (
    <div className='border-2
    grid grid-cols-6 grid-rows-1 items-center place-content-center'>
      <div className='col-span-5 justify-self-start  text-2xl'>To do list</div>
      {/* User Avatars: username's first letter */}
      <div className='justify-self-center flex items-center place-content-center gap-3'>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>Y</Avatar>
        <span className='cursor-pointer '>Log out?</span>
      </div>
    </div>
  )
}
