import { useState } from 'react'
import './App.css'
import {  BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './assets/user/Login'
import HomePage from './HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
    <Route index path="/" element={<HomePage />}></Route>
    <Route path="/login" element={<Login />}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
