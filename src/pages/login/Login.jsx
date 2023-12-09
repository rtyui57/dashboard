import "./login.scss";
import { useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => setAuth(null), []);

  function requestToken(userData) {
    Axios.post("http://localhost:8080/user/auth", userData)
      .then((res) => {
        setAuth(res.data);
        navigate("/users");
      })
      .catch((err) =>
        toast.error(`Error ${err.response.status}: ${err.response.data}`)
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
        <h1>Log In</h1>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button className="btn btn-primary">Log In</button>
      </form>
    </div>
  );
}
