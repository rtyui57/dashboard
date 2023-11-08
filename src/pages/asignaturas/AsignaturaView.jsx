import { useParams } from "react-router-dom";
import Selector from "../../components/selector/Selector";
import { useState } from "react";
import Calendar from "../../components/calendar/Calendar";

function AsignaturaView() {
  const views = ["Calendario", "Profesores", "Alumnos", "Aulas"];
  const [view, setView] = useState("Calendario");
  const { asignatura } = useParams();
  let content;
  if (view == views[0]) {
    content = <Calendar />;
  } else {
    content = "Hola";
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
