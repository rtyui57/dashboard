import "./userDetails.scss";
import Axios from "axios";
import { getCustomer } from "../../pages/login/CookieManager";
import { useState, useEffect } from "react";

const UserDetails = ({ selectedUser, refreshUsers, setSelectedUser }) => {
  const [localUser, setLocalUser] = useState(selectedUser);

  useEffect(() => {
    if (selectedUser !== null) {
      setLocalUser(selectedUser);
    }
  }, [selectedUser]);

  function saveUser(user) {
    Axios.post("http://localhost:8080/user", user, {
      headers: { customer: getCustomer() },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    refreshUsers();
    setSelectedUser(user)
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

  return (
    <div className="userDetails">
      <h1>Formulario de Usuario</h1>
      {selectedUser ? (
        <form className="inputs">
          <div className="wrapinput">
            <p>First Name</p>
            <input
              type="text"
              name="firstName"
              value={selectedUser.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="wrapinput">
            <p>Last Name</p>
            <input
              type="text"
              name="lastName"
              value={selectedUser.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="wrapinput">
            <p>Email</p>
            <input
              type="text"
              name="email"
              value={selectedUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="wrapinput">
            <p>Description</p>
            <input
              type="text"
              name="description"
              value={selectedUser.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="wrapinput">
            <p>Username</p>
            <input
              type="text"
              name="username"
              value={selectedUser.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="wrapinput">
            <p>Password</p>
            <input
              type="text"
              name="password"
              value={selectedUser.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="buttons">
            <button className="save" onClick={() => saveUser(localUser)}>
              Guardar Cambios
            </button>
            <button className="delete" onClick={() => deleteUser(selectedUser)}>
              Delete
            </button>
          </div>
        </form>
      ) : (
        <p>Selecciona un usuario para ver sus detalles.</p>
      )}
    </div>
  );
};

export default UserDetails;
