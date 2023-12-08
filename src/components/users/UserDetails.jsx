import "./userDetails.scss";
import AxiosController from "../../utils/AxiosController";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { username } = useParams();
  const [localUser, setLocalUser] = useState({});
  const axiosController = AxiosController();

  function saveUser(user) {
    axiosController.post("/user", user)
      .then(() => toast.info("Creado usuario"))
      .catch((err) => console.log(err));
    setLocalUser();
  }

  useEffect(() => {
    axiosController.get(`/user?id=${username}`)
      .then((res) => {
        setLocalUser(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function deleteUser() {
    axiosController.delete(`/user/${username}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setLocalUser({ ...localUser, [name]: value });
    console.log(localUser);
  }

  return (
    <div className="flex flex-col">
      <h1>Informacion del usuario: {username}</h1>
      <div className="inputs flex flex-col">
        <div className=""></div>
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
        <div className="flex p-2 justify-between w-full">
          <button
            className="bg-green-400 p-2 rounded-md text-white"
            onClick={() => saveUser(localUser)}
          >
            Guardar
          </button>
          <button className="bg-red-600 p-2 rounded-md" onClick={deleteUser}>
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
