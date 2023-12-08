import "./login.scss";
import { useState, useEffect } from "react";
import Axios from "axios";
import { setCustomer, setUser } from "./CookieManager";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [userCred, setUserCred] = useState({ username: "", password: "" });
  const { setAuth } = useAuth();

  useEffect(() => setAuth(null), []);

  function handleInputChange(e) {
    const { name, value } = e.target; // Usar name y value directamente
    setUserCred({ ...userCred, [name]: value });
  }

  function requestToken(e) {
    Axios.post("http://localhost:8080/user/auth", userCred)
      .then((res) => {
        console.log(res);
        //setUser(res.data.username, 15);
        setAuth(res.data);
      })
      .catch((error) => toast.error("Error en login, causa: " + error));
  }

  return (
    <div className="formParent">
      <div className="loginForm">
        <h1>Sign In</h1>
        <input
          type="text"
          name="username"
          value={userCred.username}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="password"
          value={userCred.password}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={requestToken}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
