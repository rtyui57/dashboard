import "./viewClassroom.scss";
import { useState } from "react";
import Calendar from "../calendar/Calendar";

function ViewClassroom() {
  const estados = ["calendario", "qr", "asientos"];
  const [view, setView] = useState(estados[0]);
  let renderView;

  if (view === estados[0]) {
    renderView = <Calendar/>;
  } else {
    renderView = <div className="ds">Nada</div>
  }
  return (
    <div className="clasroomView">
      <div className="acciones w-full flex">
        <button onClick={() => setView(estados[0])}>Calendario</button>
        <button onClick={() => {setView(estados[1])}}>Qr</button>
        <button onClick={() => setView(estados[2])}>Vista Asinetos</button>
      </div>
      {renderView}
    </div>
  );
}

export default ViewClassroom;
