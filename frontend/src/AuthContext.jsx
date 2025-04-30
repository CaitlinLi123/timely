import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "./axios";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();
const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/oauth",
  "/forget-password",
  "/reset",
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const validate = () => {
    authApi
      .get("/validate", { withCredentials: true })
      .then((res) => {
        let userFound = res.data.user;
        if (userFound != null) {
          setUser(userFound);
          if (location.pathname === "/login") {
            navigate("/");
          }
        } else {
          if (!PUBLIC_ROUTES.includes(location.pathname)) {
            navigate("/login");
          }
        }
      })
      .catch((error) => {
        if (!PUBLIC_ROUTES.includes(location.pathname)) {
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!PUBLIC_ROUTES.includes(location.pathname) && user == null) {
      validate();
    }
  }, [location.pathname]); // listen to route changes

  return (
    <AuthContext.Provider value={{ user, setUser, loading, validate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
