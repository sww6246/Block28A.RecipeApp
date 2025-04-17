import { createContext, useContext, useState, useEffect } from "react";

// Create context for authentication
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  // Get token from localStorage on initial load
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken ? savedToken : null;
  });

  // Login function to store token
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  // Logout function to remove token
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};