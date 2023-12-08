import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token == null) {
          navigate("/login");
          return <div>Hola</div>;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
