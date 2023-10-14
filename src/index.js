import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import CustomerContextProvider from "./context/userContext";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <CustomerContextProvider>
        <App />
      </CustomerContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
