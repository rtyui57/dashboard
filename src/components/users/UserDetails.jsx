import "./userDetails.scss";
import Axios from "axios";
import { getCustomer } from "../../pages/login/CookieManager";
import { useState, useEffect } from "react";

const UserDetails = ({ selectedUser, refreshUsers, setSelectedUser }) => {
  const [localUser, setLocalUser] = useState(
    selectedUser ? { ...selectedUser } : null
  );

  const [titulo, setTitulo] = useState("Formulario de Usuario")

  useEffect(() => {
    if (selectedUser !== null) {
      setLocalUser(selectedUser);
      setTitulo("Formulario de Usuario")
    }
  }, [selectedUser]);

  function saveUser(user) {
    Axios.post("http://localhost:8080/user", user, {
      headers: { customer: getCustomer() },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    refreshUsers();
    setSelectedUser(user);
  }

  function deleteUser(user) {
    Axios.delete(`http://localhost:8080/user/${user.username}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    refreshUsers();
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setLocalUser({ ...localUser, [name]: value });
  }

  function displayUserInfo() {
    return (
      <form className="inputs">
        <div className="wrapinput">
          <p>Username</p>
          <input
            type="text"
            name="username"
            value={localUser.username !== null ? localUser.username : ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="wrapinput">
          <p>Email</p>
          <input
            type="text"
            name="email"
            value={localUser.email !== null ? localUser.email : ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="wrapinput">
          <p>First Name</p>
          <input
            type="text"
            name="firstName"
            value={localUser.firstName !== null ? localUser.firstName : ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="wrapinput">
          <p>Last Name</p>
          <input
            type="text"
            name="lastName"
            value={localUser.lastName !== null ? localUser.lastName : ""}
            onChange={handleInputChange}
          />
        </div>    
        <div className="wrapinput">
          <p>Description</p>
          <input
            type="text"
            name="description"
            value={localUser.description !== null ? localUser.description : ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="wrapinput">
          <p>Password</p>
          <input
            type="text"
            name="password"
            value={localUser.password !== null ? localUser.password : ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="buttons">
          <button className="save" onClick={() => saveUser(localUser)}>
            Guardar Cambios
          </button>
          <button className="delete" onClick={() => deleteUser(selectedUser)}>
            Borrar
          </button>
        </div>
      </form>
    );
  }
  let contenido;
 
  if (localUser === null) {
    contenido = <p>Selecciona un usuario para ver sus detalles.</p>;
  } else {
    if (localUser.action === "createUser") {
      setLocalUser({ username : '', email: '', firstName : '', lastName : '', password : '', description : '', customer: getCustomer()});
      setTitulo("Create")
    }
    contenido = displayUserInfo();
  }

  return (
    <div className="userDetails">
      <h1>{titulo}</h1>
      {contenido}
    </div>
  );
};

export default UserDetails;
