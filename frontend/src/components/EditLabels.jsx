import React, { useContext, useEffect, useState } from 'react'
import EditPartBoard from './EditPartBoard'
import SelectLabels from './SelectLabels';
import CreateLabels from './CreateLabels';
import { todoContext } from '../page/HomePage';
import { LabelApi } from '../axios';
import { useAuth } from '../AuthContext';

export default function EditLabels({setEditLabels,usedLabels,setUsedLabels,todoid}) {
    const [select,setSelect] = useState(true);
    const {colors} = useContext(todoContext);
    const {user} = useAuth();
    const [labels,setLables] = useState([]);
      
    useEffect(()=>{
      LabelApi.get(`/all/${user}`).then((res)=>{
        setLables(res.data);
      }).catch((e)=>{
        console.log(e);
      })
      console.log(todoid);

    },[])
  return (
    <EditPartBoard key={`editlabels_${todoid}`}>
        {select === true ? <SelectLabels key={`selectlabels_${todoid}`}
        labels={labels} setLables = {setLables}
        setSelect={setSelect} 
        setUsedLabels={setUsedLabels} usedLabels={usedLabels}
        setEditLabels={setEditLabels}
        todoid={todoid}
        />:
        <CreateLabels key={`createlabels_${todoid}`}
        setSelect={setSelect} 
        setUsedLabels={setUsedLabels} usedLabels={usedLabels}
        labels={labels} setLables = {setLables}
        user={user}
        />}
    </EditPartBoard>
  )
}
