import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import "./calendar.scss";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import esLocale from "@fullcalendar/core/locales/es";
import Attendance from "../attendance/Attendance";

function Calendar({events, fecha, nombre, ocupacion, asistentes, ausentes}) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventData, setEventData] = useState({});

  function getModal() {
    return (
      <Modal
        className="modalStyle"
        isOpen={modalIsOpen}
        onRequestClose={() => handleCloseModal()}
        contentLabel="Example Modal"
      >
        <button className="border-lime-500 text-xl to-red-400"onClick={() => handleCloseModal()}>X</button>
        <Attendance
          fecha={fecha}
          nombre="Fisica"
          ocupacion="80/980"
          asistentes={["as", "sfsadjfkldasjf", "adad", "as", "sfsadjfkldasjf", "adad"]}
          ausentes={["as", "sfsadjfkldasjf", "adad"]}
        />
      </Modal>
    );
  }

  const handleEventClick = (info) => {
    setEventData(info.event);
    setModalIsOpen(true);
    document.getElementById("calendario").style.zIndex = "-1";
    document.getElementById("calendario").style.position = "relative";
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    document.getElementById("calendario").style.zIndex = "auto";
    document.getElementById("calendario").style.position = "static";
  };

  return (
    <div className="cont h-40">
      {getModal()}
      <div id="calendario">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={[
            { id: 1, title: "event 1", date: "2023-10-27 09:29" },
            { id: 2, title: "event 2", date: "2023-10-27 18:29" },
          ]}
          headerToolbar={{
            start: "today prev, next",
            center: "title",
            end: "dayGridMonth, timeGridWeek, timeGridDay",
          }}
          views={{
            timeGrid: {
              allDaySlot: false,
            },
          }}
          eventClick={handleEventClick}
          locale={esLocale}
        />
      </div>
    </div>
  );
}

export default Calendar;
