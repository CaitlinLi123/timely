import React, { use, useState } from 'react'
import {authApi} from '../axios';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Footer from '../components/Footer';
import background from "../assets/login-background.jpg"

export default function LoginPage() {
    const navigate = useNavigate();
    const {validate} = useAuth();
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

    async function getToken(user){
        try {
            const response = await axios.post("http://localhost:5000/login", user, { withCredentials: true });
           if(response.status == 200){
            alert("login successful");
            validate();
            navigate("/");
           }
        } catch (error) {
            alert(error);
        }
        

    }
    function handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const user = {
            "username":formData.get("username"),
            "password":formData.get("password")};
        getToken(user);
        
    }
    
  return (
    <div className='flex'>
           {/* photo */}
           <div className='w-[45vw] h-screen'>
               <img src={background} className='w-full h-screen'/>
           </div>
   
           {/* form */}
           <div className='flex flex-grow justify-center items-center h-screen'>
               <div className='p-8 w-[80%]'>
                   <h1 className='text-3xl font-bold mb-2'>Sign in</h1>
                   <p className='mb-6'>
                       Don't have an account? <span className='text-red-500 hover:underline cursor-pointer' onClick={()=>{
                        navigate("/register");
                       }}>Register here.</span> 
                   </p>
                   <form className='space-y-4'>
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
   
            
             <button type='submit' className='w-full font-bold text-white bg-red-400 p-3 rounded-lg hover:bg-red-600 transition cursor-pointer'>Login</button>
             <div>Oauth placeholder</div>
                   </form>
               </div>
           </div>
      </div>
    
  );
}
