import React, { createContext, useContext, useState, useEffect } from "react";
import Axios from "axios";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [tokenData, setToken] = useState(null);

  useEffect(() => {
    // Realiza tu petición API aquí y guarda los datos en apiData
    Axios.post(
      "http://localhost:8080/user/auth",
      { hopla : "hola"},
      { headers: { "Content-Type": "application/json" } }
    ).then((res) => {
      console.log(res.data);
      setToken(res.data)
    });
  }, []);

  return (
    <TokenContext.Provider value={tokenData}>{children}</TokenContext.Provider>
  );
};

export const useTokenData = () => {
  return useContext(TokenContext);
};
