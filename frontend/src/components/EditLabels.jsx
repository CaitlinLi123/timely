import React, { createContext,useState } from 'react'
import EditPartBoard from './EditPartBoard'
import SelectLabels from './SelectLabels';
import CreateLabels from './CreateLabels';
import EditOneLabel from './EditOneLabel';

export const labelContext = createContext();

export default function EditLabels({todoid}) {
    const [select,setSelect] = useState(true);
    const [editALabel,setEditALabel] = useState(false);
    const [labelTobeEdit, setLabelTobeEdit] = useState(null);

  return (
    <labelContext.Provider value={{select,setSelect,editALabel,setEditALabel,labelTobeEdit,setLabelTobeEdit}}>
        <EditPartBoard key={`editlabels_${todoid}`}>
        {select === true ? <SelectLabels key={`selectlabels_${todoid}`}
        todoid={todoid}
        />:
        editALabel === false?
        <CreateLabels key={`createlabels_${todoid}`}
        /> : 
        <EditOneLabel key={`editOnelabel_${todoid}`}
        todoid={todoid}
        />
        }
    </EditPartBoard>
    </labelContext.Provider>
  
  )
}
