import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function AddTodo() {
    const {setHigh,setLow,setMedium} = useContext(todoContext);
  return (
    <div className='grid grid-cols-7'>
        <input className='col-span-2' type='text'/>
        <div>
            <select name="priority" id="addtodo_priority">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select> 
        </div>
        <input type='text'/>
        <input type="date" />
        <div>
        <select name="status" id="addtodo_status">
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="complete">Complete</option>
        </select> 
        </div>
        <div>
        <button className='cursor-point'>
                <AddIcon />
            </button>
            <button className='cursor-point'>
                <DeleteIcon />
            </button>
        </div>
        
    </div>
  )
}
