import React, { useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { todoContext } from '../page/HomePage';
import { useContext } from 'react';
export default function CreateLabels({setSelect}) {
    const {colors} = useContext(todoContext);
    const [chosenColor, setChosenColor] = useState("#FCA5A5");
    const [newLabel,setNewLabel] = useState("your new label");
  return (
    <>
        <div className='flex mt-[2%] justify-between'>
            <div>Labels</div>
                <div className=''>
                <button 
                    className='rounded-full bg-red-200 cursor-pointer hover:bg-red-300'
                    onClick={()=>{
                            console.log("Closing CreateLabels...");
                            setSelect(true)}}>
                        <ArrowBackIosIcon />
                    </button>
                </div>
        </div>
        
        {/* show board */}
        <div className='w-full bg-gray-200 h-[100px] flex flex-wrap content-center justify-center'>
            <div 
                className='w-[4/5] h-[30px] text-white p-2 flex flex-wrap content-center justify-center'
            style={{backgroundColor: chosenColor}}>{newLabel}</div>
        </div>


        <div className="">
            Title
        </div>
        <div>
        <input type='text' className='ring ring-red-300 p-2
        w-[90%] h-min-[100px] text-md' 
        value={newLabel} onChange={(e)=>{
            setNewLabel(e.target.value)
        }}></input>
        </div>
        <div>
            <div>Select a color</div>
            <div className='grid grid-cols-3 gap-2 cursor-pointer'>
                {colors.map(
                    color=>
                    <div className="h-15 w-15"
                    style={{backgroundColor: color}}
                    onClick={
                        
                            ()=>{setChosenColor(color)}
                        
                    }
                    ></div>
                )}
            </div>
        </div>
        <button className='rounded-lg
              bg-red-200 px-2 py-1 mb-1 
              hover:outline-none hover:ring-2 hover:ring-red-300 hover:border-transparent
              hover:bg-red-300 hover:text-white cursor-pointer'>Create</button>
    </>
  )
}
