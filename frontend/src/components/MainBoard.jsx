import React, { useContext, useEffect} from 'react'
import Todo from './Todo'
import { todoContext } from '../page/HomePage';
import axios from 'axios';

export default function MainBoard({user}) {
  // const columns = [
  //   { field: 'description', headerName: 'Description', width: 150 },
  //   { field: 'type', headerName: 'Type', width: 150 },
  //   { field: 'status', headerName: 'Status', width: 150 },
  // ];
  const {todos,setTodos} = useContext(todoContext);

  useEffect(()=>{
    if (!user) return;
    axios.get(`http://localhost:8000/task/todos/all/${user}`)
    .then(res=>{
      if(res.data){
        setTodos(res.data);
      }
    })
    .catch((e)=>{
      console.log(e);
    })
  },[user])

  return (
    <div className='h-2/3 w-full'>
      {/* <BoardBar todos={todos} setTodos={setTodos}/>
      {
        todos.map(todo => (
           <Todo todo={todo}/>)
        )
      } */}
    {/* <DataGrid rows={todos} columns={columns}/> */}
      {/* {todos? <PriorityBoard todos={todos} /> : "" } */}

      <ul className='divide-y divide-gray-300  divide-opacity-100'>
              {todos!=null ? todos.map(todo=><li><Todo todo={todo} /></li>):""} 
              </ul>
      
    </div>
  )
}
