import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser,loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
