import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();

  const validate = () => {
    axios.get("http://localhost:5000/validate", { withCredentials: true })
      .then(res => {
        let username = res.data;
        console.log(res);
        if(username != null){
            setUser(username);
            navigate("/");
        }else{
            navigate("/login");
        }
        
      })
      .catch(() => {
        navigate("/login");
      })
      .finally(()=>setLoading(false));
  }

  useEffect(()=>{validate()}, []);

  return (
    <AuthContext.Provider value={{ user, setUser,loading,validate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
