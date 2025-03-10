import React from 'react'
import Todo from './Todo'

export default function PriorityBoard({todos}) {
    console.log(todos);
  return (
    <div>
        <ul>
            {
        todos.map(todo=><li><Todo todo={todo} /></li>)
    } 
        </ul>
       </div>
  )
}
