import "./userDetails.scss";
import AxiosController from "../../utils/AxiosController";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Selector from "../selector/Selector";
import Calendar from "../calendar/Calendar";
import { DataGrid } from "@mui/x-data-grid";
import { asignaturasColumns } from "../../pages/asignaturas/list/asignaturasTable";

const UserDetails = () => {
  const VIEW = { ASIGNATURAS: "ASIGNATURAS", HORARIO: "HORARIO", INFO: "INFO" };
  const [view, setView] = useState(VIEW.INFO);
  const [key, setKey] = useState(1);
  const [localUser, setLocalUser] = useState({});
  const [events, setEvents] = useState([]);
  const { username } = useParams();
  const axiosController = AxiosController();

  function saveUser(user) {
    axiosController
      .post("/user", user)
      .then(() => toast.info("Creado usuario"))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loaduser();
    loadEvents();
  }, [key]);

  function loaduser() {
    axiosController
      .get(`/user?id=${username}`)
      .then((res) => setLocalUser(res.data))
      .catch((err) => console.log(err));
  }

  function loadEvents() {
    axiosController
      .get(`/user/${username}/horario`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  }

  function deleteUser() {
    axiosController
      .delete(`/user/${username}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setLocalUser({ ...localUser, [name]: value });
  }

  const info = () => {
    return (
      <div className="flex flex-col content-center h-full px-64 py-12">
        <h1 className="flex justify-center">
          Informacion del usuario: {username}
        </h1>
        <div className="inputs flex flex-col">
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

  const asignaturas = () => {
    return (
      <div className="">
        <h1>Lista de asignaturas del usuario: {username}</h1>
        <DataGrid
          rows={localUser.asignaturas}
          columns={asignaturasColumns}
          onColumnWidthChange={(params) => {
            console.log(params);
          }}
          className="tabla p-2 m-4"
        />
      </div>
    );
  };

  return (
    <div className="">
      <Selector
        setView={setView}
        views={[VIEW.INFO, VIEW.ASIGNATURAS, VIEW.HORARIO]}
        currentView={view}
      />
      {view === VIEW.INFO && info()}
      {view === VIEW.HORARIO && (
        <Calendar events={events} key={key} setKey={setKey} />
      )}
      {view === VIEW.ASIGNATURAS && asignaturas()}
    </div>
  );
};

export default UserDetails;
