import React from 'react'
import { useAuth } from '../AuthContext'
import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function ProfilePanel() {

    const {user} = useAuth();
    let email = `${user}@gmail.com`;

    const navigate = useNavigate();

    const handleLogout = ()=>{
        navigate("/login");
        // axios.get("http://localhost:5000/logout", { withCredentials: true })
        // .then(res=>{
        // alert(res.data);
        
        // })
        // .catch((e)=>{
        // console.log(e);
        // })
    }

  return (
    <div className='absolute top-[100%] right-[50%]  shadow-lg z-10 
    bg-white text-black rounded-md
    border border-gray-200 flex flex-col p-3 gap-3'>
        {/* title */}
        <div className='text-sm'>Account</div>
        <div className='flex gap-2 border-b border-gray-200'>
            {/* Avatar */}
           <Avatar sx={{ bgcolor: deepPurple[500] }} 
        sizes='small'>{user[0]}</Avatar>
            {/* username and email */}
            <div className='flex flex-col py-[1px] text-sm'>
                <div>{user}</div>
                <div>{email}</div>
            </div>
        </div>
        <div className='py-[3px]'>
            <div className='cursor-pointer hover:bg-gray-200'>Edit Profile</div>
            <div className='cursor-pointer hover:bg-gray-200'
            onClick={handleLogout}
            >Log out</div>
        </div>
        
    </div>
  )
}
