import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { TokenProvider } from "./context/TokenContext";

ReactDOM.render(
  <React.StrictMode>
    <TokenProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </TokenProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
