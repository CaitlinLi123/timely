import React from 'react'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import EditPartBoard from './EditPartBoard';

export default function EditDes({description,setEditDes,id}) {

const editDesc = ()=>{
    axios.patch(`http://localhost:8000/task/${id}?description=${description}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res=>{
        if(res.status===200){
            console.log(res.data);
            alert("success");
        }
    }).catch(e=>{
        console.log(e);
    })
}
  return (
    <EditPartBoard>
        <div className='absolute top-2 right-2'>
             <IconButton>
                <CloseIcon onClick={()=>{setEditDes(false)}}/>
            </IconButton>
        </div>
       
        <div className='mt-[2%]'>
            Change Description 
            </div>
        <input type='text' value={description}
        className='ring ring-red-300 border-transparent
        w-[90%] h-[75%] text-sm py-0 px-2 rounded-lg
        '></input>
        <button className=' rounded-lg
      bg-red-200 px-2 py-1 mb-1 
      hover:outline-none hover:ring-2 hover:ring-red-300 hover:border-transparent
      hover:bg-red-300 hover:text-white cursor-pointer'
      onClick={editDesc}>Save</button>
    </EditPartBoard>
  )
}
