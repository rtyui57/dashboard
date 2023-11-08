import "./viewClassroom.scss";
import { useState } from "react";
import Calendar from "../calendar/Calendar";
import Selector from "../selector/Selector";

function ViewClassroom() {
  const estados = ["Calendario", "Qr", "asientos"];
  const [view, setView] = useState(estados[0]);
  let renderView;

  if (view === estados[0]) {
    renderView = <Calendar />;
  } else {
    renderView = <div className="ds">Nada</div>;
  }
  return (
    <div className="clasroomView">
      <Selector views={estados} setView={setView} />
      {renderView}
    </div>
  );
}

export default ViewClassroom;
