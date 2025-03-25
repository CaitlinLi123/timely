import React, { Children } from 'react'

export default function EditPartBoard({children}) {
  return (
    <div className='absolute w-[25%] left-[10%] min-h-[200px]
    shadow-xl place-items-center gap-2 py-2 border border-opacity-20
    flex flex-col bg-white z-40 rounded-lg' key={new Date(Date.now)}>
        {children}
    </div>
  )
}
