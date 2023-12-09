import React, { createContext, useContext, useState } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [username, setUsername] = useState(null);

  function setAuth(newToken) {
    setToken(newToken);
    if (newToken !== null) {
      const decodedToken = jwtDecode(newToken);
      setUsername(decodedToken.sub)
      setPermissions(decodedToken.auths)
    }
  }

  function getAuth() {
    return token;
  }

  function getPermissions() {
    return permissions;
  }

  function getUsername() {
    return username;
  }

  return (
    <AuthContext.Provider value={{ token, setAuth, getAuth, username, permissions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
