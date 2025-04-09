import { createContext, useContext, useState, useEffect } from "react";
import axios from "./axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    axios
      .get("http://localhost:5000/validate", { withCredentials: true })
      .then((res) => {
        let userFound = res.data.user;
        if (userFound != null) {
          setUser(userFound);
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        navigate("/login");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user == null) {
      validate();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, validate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
