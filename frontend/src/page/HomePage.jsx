import React from 'react'
import MainBoard from "../components/MainBoard";
import AppNav from "../components/AppNav";

export default function HomePage() {
  return (
    <div className='flex flex-col p-5'>
      <AppNav />
      <MainBoard />
    </div>
  )
}
