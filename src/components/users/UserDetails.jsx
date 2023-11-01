import "./userDetails.scss";
import Axios from "axios";
import Sidebar from "../sidebar/Sidebar";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { username } = useParams();
  const [localUser, setLocalUser] = useState({});

  function saveUser(user) {
    Axios.post("http://localhost:8080/user", user)
      .then(() => {
        toast.info("Creado usuario", {
          position: "bottom-right",
          autoClose: 3000,
        });
      })
      .catch((err) => console.log(err));
    setLocalUser();
  }

  useEffect(() => {
    Axios.get(`http://localhost:8080/user?id=${username}`)
      .then((res) => {
        setLocalUser(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function deleteUser() {
    Axios.delete(`http://localhost:8080/user/${username}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setLocalUser({ ...localUser, [name]: value });
    console.log(localUser)
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <h1>Informacion del usuario: {username}</h1>
        <form className="inputs">
          <ToastContainer />

          <div className="wrapinput">
            <p>Username</p>
            <input
              type="text"
              name="username"
              value={localUser.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="wrapinput">
            <p>Email</p>
            <input
              type="text"
              name="email"
              value={localUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="wrapinput">
            <p>First Name</p>
            <input
              type="text"
              name="firstName"
              value={localUser.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="wrapinput">
            <p>Last Name</p>
            <input
              type="text"
              name="lastName"
              value={localUser.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="wrapinput">
            <p>Description</p>
            <input
              type="text"
              name="description"
              value={localUser.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="wrapinput">
            <p>Password</p>
            <input
              type="text"
              name="password"
              value={localUser.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="buttons">
            <button className="save" onClick={() => saveUser(localUser)}>
              Guardar Cambios
            </button>
            <button className="delete" onClick={deleteUser}>
              Borrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
