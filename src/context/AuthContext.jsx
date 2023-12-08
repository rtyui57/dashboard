import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  function setAuth(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  function getAuth() {
    return token;
  }

  return (
    <AuthContext.Provider value={{ token, setAuth, getAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
