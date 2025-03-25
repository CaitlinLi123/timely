import React, { useContext, useState } from 'react'
import EditPartBoard from './EditPartBoard'
import SelectLabels from './SelectLabels';
import CreateLabels from './CreateLabels';
import { todoContext } from '../page/HomePage';

export default function EditLabels({setEditLabels,type,setType}) {
    const [select,setSelect] = useState(true);
    const {colors} = useContext(todoContext);
    const [labels,setLables] = useState([
        {"name":"backend","color":5},
            {"name":"leetcode","color":0}]);
  return (
    <EditPartBoard>
        {select === true ? <SelectLabels 
        labels={labels} setSelect={setSelect} 
        setType={setType} type={type}
        setEditLabels={setEditLabels}/>:<CreateLabels setSelect={setSelect} setType={setType}/>}
    </EditPartBoard>
  )
}
