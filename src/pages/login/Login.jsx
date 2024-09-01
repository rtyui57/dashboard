import "./login.scss";
import { useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => setAuth(null), []);

  function requestToken(userData) {
    Axios.post(API_URL + "/user/auth", userData)
      .then((res) => {
        setAuth(res.data);
        navigate("/");
      })
      .catch((err) =>
        toast.error(`Error al Iniciar Sesión: Causa ${err.response.status}: ${err.response.data}`)
      );
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fields = new FormData(event.target);
    requestToken({
      username: fields.get("username"),
      password: fields.get("password"),
    });
  }

  return (
    <div className="formParent">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1 className="text-xl text-blue-800">Iniciar Sesión</h1>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button className="btn btn-primary">Iniciar Sesión</button>
      </form>
    </div>
  );
}
