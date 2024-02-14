import "./viewClassroom.scss";
import { useState } from "react";
import Calendar from "../calendar/Calendar";
import Selector from "../selector/Selector";
import QRCode from "react-qr-code";

function ViewClassroom({ building, selectedClassroom }) {
  const ESTADOS = { CALENDARIO: "CALENDARIO", QR: "QR", ASIENTOS: "ASIENTOS" };
  const [view, setView] = useState(ESTADOS.CALENDARIO);

  return (
    <div className="clasroomView">
      <Selector views={Object.values(ESTADOS)} setView={setView} />
      {view === ESTADOS.CALENDARIO && (
        <div className="">
          <h1> Calendario de {selectedClassroom?.name}</h1>
          <Calendar
            events={selectedClassroom?.horarios ?? []}
            aula={selectedClassroom === null ? null : selectedClassroom.id}
          />
        </div>
      )}
      {view === ESTADOS.ASIENTOS && <div>Asientos</div>}
      {view === ESTADOS.QR && (
        <div>
          Codigo QR <QRCode value="marca.com" />
        </div>
      )}
    </div>
  );
}

export default ViewClassroom;
