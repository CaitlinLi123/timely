import React, { useState,useContext, useEffect,createContext } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditDes from './EditDes';
import EditLabels from './EditLabels';
import { todoContext } from '../page/HomePage';

export const labelContext = createContext();

export default function Todo({todo}) {
   const [description, setDescription] = useState(todo.description);
    const [priority, setPriority] = useState(todo.priority);
    const [usedLabels, setUsedLabels] = useState(todo.labels);
    const [date, setDate] = useState(todo.date); // Format for date input
    const [status, setStatus] = useState(todo.status);

    const [hover,setHover] = useState(false);
    const [editDes, setEditDes] = useState(false);
    const [editLabels, setEditLabels] = useState(false);
  
    const {colors} = useContext(todoContext);
  // const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDescriptionChange = ()=>{
    setEditDes(true);
  }

  // const handleDeleteClick = ()=>{
  //   setConfirmDelete(true);
  // }

  // const handleConfirmDeleteClick = ()=>{
  //   axios.delete(`http://localhost:8000/task/${todo.id}`).then(
  //     (res)=>{
  //       if(res.status==200){
  //         setTodos(todos=>todos.filter(td=>td.id!=todo.id));
  //         alert("success in deleting.");
  //       }else{
  //         alert("Something went wrong....",res.status);
  //       }
         
  //     }

  //   ).catch(e=>{
  //     console.log(e);
  //   })
  //   .finally(setConfirmDelete(false));
  // }

  // const {todos,setTodos} = useContext(todoContext);

  const handleClickLabels = ()=>{
    setEditLabels(true);
  }

  useEffect(()=>{
    console.log(editLabels);
  },[editLabels])
  

  return (
    <labelContext.Provider value={{editLabels,setEditLabels}}>
      <div className='relative grid grid-cols-7 w-full justify-items-start text-left 
    my-[0.5%] px-[3%]'  key={`todo_${todo.id}`}>

      {/* edit? <EditTodo todo={todo} setTodos={setTodos} todos={todos} setEdit={setEdit}/> :  */}
       <div className='flex col-span-2 hover:bg-gray-200 justify-items-start text-left' 
        type='text' id="edittodo_description" name='description' 
        onChange={(e) => setDescription(e.target.value)}
        onMouseOver={()=>{setHover(true)}}
        onMouseOut={()=>{setHover(false)}}
          >
          <div className='flex items-center'>
            {description}
          {hover ? <EditIcon 
          className='cursor-pointer'
          onClick={handleDescriptionChange}/> : ""}
          </div>
        
          <div className="absolute top-full left-0 w-full z-50">
          {editDes?
            <EditDes description={description} setEditDes={setEditDes} key={`editDesc_${todo.id}`} todoid={todo.id}/>    
            :""}
          </div>
        </div>
        <div>
            <select name="priority" id="edittodo_priority" value={priority.toLowerCase()}
            onChange={(e) => setPriority(e.target.value)}
            >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select> 
        </div>

   
        <select name="status" id="edittodo_status" value={status.toLowerCase()} 
        onChange={(e) => setStatus(e.target.value)}
        >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="complete">Complete</option>
        </select> 

          <div className='col-span-2 relative'>
            <div id="edittodo_labels" className='
              cursor-pointer flex gap-2 flex-wrap'  onClick={handleClickLabels}>
                <div className='rounded-full bg-gray-100 h-5 w-5 cursor-pointer hover:bg-gray-200
                flex justify-center items-center'  onClick={handleClickLabels}>+</div>
              {usedLabels.map(usedLabel=><div 
              className='rounded-md px-2 text-sm place-content-center' key={`usedlabels_${usedLabel.id}`}
              style={{backgroundColor:usedLabel.color}}>{usedLabel.name}</div>)}
            </div>
            {editLabels === true? <EditLabels key={`editlabels_${todo.id}`} 
            setEditLabels={setEditLabels} usedLabels={usedLabels} 
            setUsedLabels={setUsedLabels}
            todoid={todo.id} /> : null}        
          </div>
        
        
        <input type="date" id="edittodo_date" name='date' 
        // value={date} 
        onChange={(e) => setDate(e.target.value)}
        value={date ? date.split("T")[0] : "" }
        />
       
        <div>
        
        </div>
      
      
     
    </div>
    </labelContext.Provider>
    
  )
}
