import "./login.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useContext } from "react";
import Axios from "axios";
import { setCustomer, setUser } from "./CookieManager";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CustomerContext } from "../../context/userContext";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { setCustomerContext } = useContext(CustomerContext);
  const [userCred, setUserCred] = useState({ user: "", password: "" });
  const navigate = useNavigate();

  function handleInputChange(e) {
    const { name, value } = e.target; // Usar name y value directamente
    setUserCred({ ...userCred, [name]: value });
  }

  function login(e) {
    Axios.post("http://localhost:8080/user/auth", userCred)
      .then((res) => {
        console.log(res)
        setCustomerContext(res.data.customer);
        setUser(res.data.username, 15);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error en login, causa: " + error.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
      });
  }

  return (
    <div className="home">
      <ToastContainer />
      <Sidebar />
      <div className="homeContainer">
        <div className="formParent">
          <div className="loginForm">
            <h1>Sign In</h1>
            <input
              type="text"
              name="user"
              value={userCred.user}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="password"
              value={userCred.password}
              onChange={handleInputChange}
            />
            <button className="btn btn-primary" onClick={login}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
