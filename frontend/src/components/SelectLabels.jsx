import React, { useContext } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { todoContext } from '../page/HomePage';

export default function SelectLabels({labels,setSelect,setEditLabels,type,setType}) {
  const {colors} = useContext(todoContext);
  return (
    <>
        {/* title */}
                <div className='flex mt-[2%] justify-between'>
                   <div>Labels</div>
                   <div className=''>
                    <button 
                    className='rounded-full bg-red-200 cursor-pointer hover:bg-red-300'
                    onClick={()=>{
                            console.log("Closing EditLabels...");
                            setEditLabels(false)}}>
                        <CloseIcon />
                    </button>
                </div>
                </div>
            
            {/* search bar */}
                <Autocomplete
                multiple
                id="labels"
                labels
                onChange={(event,value)=>{
                  setType(value)
                }}
                defaultValue={type}
                options={labels.map((label) => label.name)}
                renderInput={(params) => <TextField {...params} label="labels"/>}
              /> 

              {/* checkboxes */}
                
                <div className='flex flex-col'>
                  {
                    labels.map(
                      (label)=>
                        <div><input type="checkbox" id={label.name} name={label.name} value={label.name} />
                  <label for={label.name} style={{backgroundColor:colors[label.color]}}> {label.name}</label>
                        </div>
                    )
                  }
                  
                </div>
              

                
                
            {/* create new labels */}
            <button className=' rounded-lg
              bg-gray-200 px-2 py-1 mb-1 
              hover:outline-none hover:ring-2 hover:ring-gray-300 hover:border-transparent
              hover:bg-gray-300 cursor-pointer'
              onClick={()=>{
                setSelect(false);
              }}
              >Create new labels</button>
            
            {/* save button */}
                <button className=' rounded-lg
              bg-red-200 px-2 py-1 mb-1 
              hover:outline-none hover:ring-2 hover:ring-red-300 hover:border-transparent
              hover:bg-red-300 hover:text-white cursor-pointer'
              >Save</button>
    </>
  )
}
