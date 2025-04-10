import React, { useContext, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { todoContext } from '../page/HomePage';
import { editContext} from './Todo';
import { labelContext } from './EditLabels';
import { todoApi } from '../axios';

export default function SelectLabels(
  {todoid}) {
  const {setLabelTobeEdit,setSelect,setEditALabel} = useContext(labelContext);
  const {usedLabels,setUsedLabels,setEditLabels} = useContext(editContext);
  const {labels} = useContext(todoContext);

  const [tmpLabels,setTmpLabels] = useState([...usedLabels]);
  
  const handleClick = ()=>{
    todoApi.patch(`/todo/${todoid}/label`,tmpLabels).then((res)=>{
      if(res.status===200){
        setUsedLabels(tmpLabels);
        alert("success to update labels");
      }else{
        alert("fail to update labels");
      }
    }).catch(e=>{
      console.log(e);
    }).finally(setEditLabels(false));
  }
  
  return (
    <>
        {/* title */}
                <div className='flex mt-[2%]'>
                   <div>Labels</div>
                   <div>
                    <button 
                    className='
                    absolute flex
                    right-[5%] 
                    rounded-full bg-red-200 cursor-pointer hover:bg-red-300'
                    onClick={()=>{
                            console.log("Closing EditLabels...");
                            setEditLabels(false)}}>
                        <CloseIcon color='action'/>
                    </button>
                </div>
                </div>
            
            {/* search bar */}
                <Autocomplete
                multiple
                id="labels-autocomplete"
                onChange={(event,value)=>{
                  setUsedLabels(value)
                }}
                // value={usedLabels.map(usedLabel=>usedLabel.name)}
                // options={labels != null ? labels.map((label) => label.name) : []}
                value={tmpLabels} 
                options={labels || []}
                getOptionLabel={(option) => option.name} 
                renderInput={(params) => <TextField {...params} label="Labels"
                />}
              /> 
              {/* checkboxes */}
                
                <div className='flex flex-col gap-2 align-items-center justify-items-center'>
                  {
                    labels? labels.map(
                      (label)=>
                        <div key={label.id} className='flex gap-2'><input type="checkbox" id={label.name} name={label.name} value={label.name} 
                        checked={tmpLabels.some((tmpLabel)=>tmpLabel.id === label.id)}
                        onChange={(e)=>{
                          if(e.target.checked){
                            setTmpLabels([...tmpLabels,label]);
                          }else{
                            setTmpLabels(tmpLabels.filter((l)=>l.id!=label.id));
                          }
                        }}  
                        />
                  <label htmlFor={label.name} style={{backgroundColor:label.color}} 
                  className='px-2 rounded-lg'> {label.name}</label>
                  <button 
                    className='rounded-sm h-5 w-5 bg-gray-100 cursor-pointer hover:bg-gray-300
                    flex align-items-center'
                    onClick={()=>{
                      setLabelTobeEdit(label);
                      setSelect(false);
                            setEditALabel(true)}}>
                        <EditIcon fontSize='small'/>
                    </button>
                        </div>
                    ) : null
                  }
                  
                </div>
            
                
            {/* create new labels */}
            <div className='w-full border-t border-gray-300 pt-2 flex justify-center'>
              <button className=' rounded-lg
              bg-gray-200 px-2 py-1 mb-1 
              hover:outline-none hover:ring-2 hover:ring-gray-300 hover:border-transparent
              hover:bg-gray-300 cursor-pointer'
              onClick={()=>{
                setSelect(false);
              }}
              >Create new labels</button>
            </div>
            
            
            <div className='flex justify-between w-full text-md border-t 
            border-gray-300
            pt-2'>
              {/* save button */}
                <button className=' rounded-lg
              bg-red-200 px-2 py-1 mb-1
              hover:outline-none hover:ring-2 hover:ring-red-300 hover:border-transparent
              hover:bg-red-300 hover:text-white cursor-pointer'
              onClick={handleClick}
              >Save</button>

              {/* save button */}
              <button className=' rounded-lg
              bg-red-200 px-2 py-1 mb-1 
              hover:outline-none hover:ring-2 hover:ring-red-300 hover:border-transparent
              hover:bg-red-300 hover:text-white cursor-pointer'
              onClick={() => setUsedLabels([])}
              >Clear</button>
            </div>
            
    </>
  )
}
