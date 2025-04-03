import React, { use, useState } from 'react'
import {authApi} from '../axios';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Footer from '../components/Footer';

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

    const handleClick = ()=>{
        navigate("/register");    
    }
    
  return (
    <div className="flex justify-center mt-[10vh] max-h-screen ">
      <div className=" rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign in</h2>
        <p className="text-sm text-gray-500 mb-6">
          or <a href="/register" className="text-red-500 hover:underline">create an account</a>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400"
            required
          />
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="remember" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)} 
              className="mr-2"
            />
            <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
          </div>

          <button type="submit" className="w-full bg-red-400 text-white p-3 rounded-lg hover:bg-red-700 transition">
            Sign in
          </button>
        </form>

        <div className="mt-4">
          <button className="w-full flex items-center justify-center border py-2 rounded-lg hover:bg-gray-100 transition">
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          <a href="/forgot-password" className="text-red-500 hover:underline">Forgotten your password?</a>
        </p>
        <Footer />
      </div>
    </div>
  );
}
