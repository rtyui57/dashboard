import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AxiosController from "../../utils/AxiosController";
import "./eventView.scss";
import { Link } from "react-router-dom";

function EventView() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [states, setStates] = useState([]);
  const [changed, setChanged] = useState(true);
  const [attendants, setAttendants] = useState(new Map());
  const axiosController = AxiosController();

  useEffect(() => {
    getEvent();
    getStates();
  }, []);

  function generateAttendants(event) {
    const attendantsMap = new Map();
    (event.estudiantes || []).forEach((estudiante) => {
      attendantsMap.set(estudiante.asistenciaId, estudiante.state);
    });
    (event.profesores || []).forEach((profesor) => {
      attendantsMap.set(profesor.asistenciaId, profesor.state);
    });
    setAttendants(attendantsMap);
    console.log(attendantsMap);
    console.log("generado");
  }

  function getEvent() {
    axiosController
      .get(`/horario/${eventId}`)
      .then((res) => {
        setEvent(res.data);
        generateAttendants(res.data);
      })
      .catch((err) => toast.error("Error obteniendo evento: " + err));
  }

  function deleteEvent() {
    axiosController
      .delete(`/horario/${eventId}`)
      .then((res) => {
        toast.success("Eliminado");
      })
      .catch((err) => toast.error(err));
  }

  function getStates() {
    axiosController
      .get(`/horario/states`)
      .then((res) => setStates(res.data))
      .catch(() => toast.error("Error trayendo states"));
  }

  function saveChanges() {
    console.log(attendants);
    axiosController
      .post("/horario/attendants", Object.fromEntries(attendants))
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
          {
            <select
              className={
                " text-white py-1 px-2 rounded-full bg-orange-300 " +
                attendants?.get(user.asistenciaId)
              }
              value={attendants?.get(user.asistenciaId)}
              onChange={(event) =>
                handleStateChange(event.target.value, user.asistenciaId)
              }
            >
              {states.map((state) => (
                <option value={state} className={state}>
                  {state}
                </option>
              ))}
            </select>
          }
        </td>
      </tr>
    ));
  }

  function handleStateChange(newState, asistenciaId) {
    setAttendants((prevAttendants) => {
      console.log(prevAttendants);
      const newAttendantsMap = new Map(prevAttendants);
      if (newAttendantsMap.has(asistenciaId)) {
        newAttendantsMap.set(asistenciaId, newState);
      }
      return newAttendantsMap;
    });
  }

  function addToGoogleCalendar() {
    let startDate = new Date(event?.start).toISOString().slice(0, -5) + "Z";
    startDate = startDate.replace(/[-:]/g, "");
    let endDate = new Date(event?.end).toISOString().slice(0, -5) + "Z";
    endDate = endDate.replace(/[-:]/g, "");
    const ualLocation = "Universidad de Almería, Almería, España";
    const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${event?.title}&details=${event?.description}&dates=${startDate}/${endDate}&location=${ualLocation}`;
    window.open(calendarUrl);
  }

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-center p-3">{event?.title}</h1>
      <div className="info justify-center flex">
        <p className="detailed">
          Fecha de Inicio: {event?.start.replace("T", " ")}
        </p>
        <p className="detailed">
          Fecha de Finalización: {event?.end.replace("T", " ")}
        </p>
        <p className="detailed">
          Asignatura:{" "}
          <Link to={`/asignaturas/${event?.asignatura}`}>
            {event?.asignatura}
          </Link>
        </p>
        <p className="detailed">
          Aula:{" "}
          <Link to={`/buildings/${event?.aula.split("--")[0]}`}>
            {event?.aula}
          </Link>
        </p>
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

      <div className=" flex justify-center align-middle">
        <Link className="p-2 m-2 bg-teal-500 w-20 rounded" to={`/calendario/${event?.calendarioId}/qr`}>QR</Link>
        <button
          className="p-2 m-2 bg-teal-500 w-20 rounded"
          onClick={addToGoogleCalendar}
        >
          Add to Google Calendar
        </button>
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
          {generateRows("ALUMNOS", event === null ? [] : event.estudiantes)}
          {generateRows("PROFESORES", event === null ? [] : event.profesores)}
        </tbody>
      </table>
    </div>
  );
}

export default EventView;
