import "./viewClassroom.scss";
import { useState } from "react";
import Calendar from "../calendar/Calendar";
import Selector from "../selector/Selector";

function ViewClassroom({ building, selectedClassroom }) {
  const estados = ["Calendario", "Qr", "asientos"];
  const [view, setView] = useState(estados[0]);
  let renderView;

  if (view === estados[0]) {
    renderView = (
      <div className="">
        <h1> Calendario de {selectedClassroom?.name}</h1>
        <Calendar
          events={selectedClassroom?.horarios ?? []}
          aula={
            selectedClassroom === null
              ? null
              : selectedClassroom.id
          }
        />
      </div>
    );
  } else {
    renderView = <div className="ds">Not implemented yet</div>;
  }
  return (
    <div className="clasroomView">
      <Selector views={estados} setView={setView} />
      {renderView}
    </div>
  );
}

export default ViewClassroom;
