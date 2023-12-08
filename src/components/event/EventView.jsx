import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AxiosController from "../../utils/AxiosController";
import "./eventView.scss";

function EventView() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [states, setStates] = useState([]);
  const [changed, setChanged] = useState(false);
  const axiosController = AxiosController();

  useEffect(() => {
    getEvent();
    getStates();
  }, []);

  function getEvent() {
    axiosController
      .get(`/horario/${eventId}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => toast.error("Error obteniendo evento: " + err));
  }

  function deleteEvent() {
    axiosController
      .delete(`/horario/${eventId}`)
      .then((res) => {toast.success("Eliminado")})
      .catch((err) => toast.error(err));
  }

  function getStates() {
    axiosController
      .get(`/horario/states`)
      .then((res) => setStates(res.data))
      .catch(() => toast.error("Error trayendo states"));
  }

  function saveChanges() {
    axiosController
      .post(`/horario/${eventId}/attendants`,
        Object.fromEntries(event.attendants)
      )
      .then((res) => toast.success("Se guardo"))
      .catch((err) => toast.error("No se guardo"));
  }

  function generateRows(category, users) {
    if (event == null) {
      return;
    }
    return users.map((user) => (
      <tr>
        <td className="py-2 px-4 border-b">
          <img
            src={"data:image/jpeg;base64," + user.icon}
            alt="Foto de usuario"
            className="h-10 w-10 rounded-full"
          />
        </td>
        <td className="py-2 px-4 border-b">{user.username}</td>
        <td className="py-2 px-4 border-b">{user.firstName}</td>
        <td className="py-2 px-4 border-b">{user.lastName}</td>
        <td className="py-2 px-4 border-b">
          <span className="bg-green-500 text-white py-1 px-2 rounded-full">
            {category}
          </span>
        </td>
        <td className="py-2 px-4 border-b">
          <select
            className={
              " text-white py-1 px-2 rounded-full bg-orange-300 " +
              event.attendants[user.id]
            }
            value={event.attendants[user.id]}
            onChange={(event) => handleStateChange(event.target.value, user.id)}
          >
            {states.map((state) => (
              <option value={state} className={state}>
                {state}
              </option>
            ))}
          </select>
        </td>
      </tr>
    ));
  }

  function handleStateChange(newState, userId) {
    setChanged(true);
    const updatedEvent = {
      ...event,
      attendants: new Map(Object.entries(event.attendants)).set(
        userId,
        newState
      ),
    };
    setEvent(updatedEvent);
  }

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-center p-3">Evento {event?.title}</h1>
      <div className="info justify-center flex">
        <p className="detailed">
          {event?.start}--{event?.end}
        </p>
        <p className="detailed">Asignatura:{event?.asignatura}</p>
        <p className="detailed">Aula: {event?.aula}</p>
        <button
          className="detailed bg-red-700 text-white"
          onClick={deleteEvent}
        >
          Delete
        </button>
        {changed ? (
          <button
            className="p-2 bg-green-300 text-white"
            onClick={() => saveChanges()}
          >
            Save
          </button>
        ) : null}
      </div>
      <h1 className="p-2 m-2 text-center">Asistentes</h1>
      <table className="w-10/12 mx-auto border border-gray-300 overflow-y-auto p-3 m-2">
        <thead>
          <tr>
            <th className="tableheader">Image</th>
            <th className="tableheader">Username</th>
            <th className="tableheader">Nombre</th>
            <th className="tableheader">Apellidos</th>
            <th className="tableheader">Categoria</th>
            <th className="tableheader">Estado</th>
          </tr>
        </thead>
        <tbody>
          {generateRows("ALUMNOS", event === null ? [] : event.alumnos)}
          {generateRows("PROFESORES", event === null ? [] : event.profesores)}
        </tbody>
      </table>
    </div>
  );
}

export default EventView;
