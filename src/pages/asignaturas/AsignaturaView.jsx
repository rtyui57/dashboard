import { useParams } from "react-router-dom";
import Selector from "../../components/selector/Selector";
import { useState, useEffect } from "react";
import Calendar from "../../components/calendar/Calendar";
import ListUsers from "../../components/listusers/ListUsers";
import Axios from "axios";
import { toast } from "react-toastify";

function AsignaturaView() {
  const views = ["Calendario", "Profesores", "Alumnos"];
  const [view, setView] = useState("Calendario");
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const { asignatura } = useParams();

  useEffect(() => {
    Axios.get("http://localhost:8080/user/list")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => toast.error(error));
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:8080/horario")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => toast.error(error));
  }, []);

  let content;
  if (view == views[0]) {
    content = <Calendar events={events} />;
  } else if (view == views[1]) {
    content = <ListUsers users={users} title={"PROFESORES"} />;
  } else if (view == views[2]) {
    content = <ListUsers users={users} title={"ESTUDIANTES"} />;
  }
  return (
    <div className="a">
      <Selector views={views} setView={setView} />
      Asingnatura: {asignatura}
      {content}
    </div>
  );
}

export default AsignaturaView;
