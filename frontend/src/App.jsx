import { useState } from 'react'
import './App.css'
import {  BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage'

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
    <Route index path="/" element={<HomePage />}></Route>
    <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
