import React, { useState } from 'react'
import axios from '../axios';
import background from "../assets/register-background.jpg"
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function getToken(user){
        try {
            const response = await axios.post("http://localhost:5000/register", user);
           if(response.status == 200){
            alert("Register successful");
           }
        } catch (error) {
            alert(error);
        }
    }
    function submit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const user = {
            "username":formData.get("username"),
            "password":formData.get("password")};
        getToken(user);
        
    }
  return (
   <div className='flex bg-light-pink/20'>
        {/* photo */}
        <div className='w-[45vw] h-screen'>
            <img src={background} className='w-full h-screen'/>
        </div>

        {/* form */}
        <div className='flex flex-grow justify-center items-center h-screen'>
            <div className='p-8 w-[80%]'>
                <h1 className='text-3xl font-bold mb-2'>Join us</h1>
                <p className='mb-6'>
                    Already have an account? <span className='text-red-500 hover:underline cursor-pointer'
                    onClick={()=>{
                        navigate("/login")
                    }}>Login here.</span> 
                </p>
                <form className='space-y-4'>
                
                <div>
                   <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2"
            required
          />
          <p className='text-sm text-gray-400 ml-2'>*Only letters, numbers and underscore</p>  
                </div>
                 
                    <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2 "
            required
          />

          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="w-full p-3 border border-gray-500 rounded-lg focus:ring-2"
            required
          />
          <button type='submit' className='w-full font-bold text-white bg-red-400 p-3 rounded-lg hover:bg-red-600 transition cursor-pointer'>Register</button>
          <div>Oauth placeholder</div>
                </form>
            </div>
        </div>
   </div>
  )
}
