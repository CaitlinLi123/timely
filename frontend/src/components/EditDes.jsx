import React from 'react'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function EditDes({originalDesciption,setEditDes}) {
  return (
    <div className='fixed w-[20%] left-[10%] h-[200px] 
    shadow-xl place-items-center gap-2  p-4
    flex flex-col bg-white z-40 rounded-lg'>
        <div className='absolute top-2 right-2'>
             <IconButton>
                <CloseIcon onClick={()=>{setEditDes(false)}}/>
            </IconButton>
        </div>
       
        <div className='mt-[2%]'>
            Change Description 
            </div>
        <input type='text' value={originalDesciption}
        className='ring ring-red-300 border-transparent
        w-[90%] h-[75%] text-sm py-0 px-2 rounded-lg
        '></input>
        <button className=' rounded-lg
      bg-red-200 px-2 py-1 mb-1 
      hover:outline-none hover:ring-2 hover:ring-red-300 hover:border-transparent
      hover:bg-red-300 hover:text-white cursor-pointer'>Save</button>
    </div>
  )
}
