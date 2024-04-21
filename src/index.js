import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { NotificationsProvider } from "./context/NotificationsContext";

ReactDOM.render(
  <AuthProvider>
    <NotificationsProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </NotificationsProvider>
  </AuthProvider>,
  document.getElementById("root")
);
