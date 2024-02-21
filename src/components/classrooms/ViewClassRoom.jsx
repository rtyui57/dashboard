import "./viewClassroom.scss";
import { useState } from "react";
import Calendar from "../calendar/Calendar";
import Selector from "../selector/Selector";
import QRCode from "react-qr-code";
import DataView from "./dataview/DataView";

function ViewClassroom({ building, selectedClassroom }) {
  const ESTADOS = { CALENDARIO: "CALENDARIO", DATA: "DATA" };
  const [view, setView] = useState(ESTADOS.CALENDARIO);

  return (
    <div className="clasroomView">
      <Selector views={Object.values(ESTADOS)} setView={setView} />
      {selectedClassroom && view === ESTADOS.CALENDARIO && (
        <div className="">
          <h1> Calendario de {selectedClassroom?.name}</h1>
          <Calendar
            events={selectedClassroom?.horarios ?? []}
            aula={selectedClassroom === null ? null : selectedClassroom.id}
          />
        </div>
      )}
      {selectedClassroom && view === ESTADOS.DATA && (
        <DataView selectedClassroom={selectedClassroom} />
      )}
      {selectedClassroom === null && (
        <div className="flex justify-center items-center">
          <h1>Seleccione un aula</h1>
        </div>
      )}
    </div>
  );
}

export default ViewClassroom;
