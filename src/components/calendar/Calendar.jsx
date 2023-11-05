import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import "./calendar.scss";
import { useState, useEffect } from "react";
import esLocale from "@fullcalendar/core/locales/es";
import EventModal from "../modal/EventModal";

function Calendar({ events }) {
  console.log("Renderizado el calendar " + events);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventData, setEventData] = useState({});

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
      <EventModal
        modalIsOpen={modalIsOpen}
        handleCloseModal={() => handleCloseModal()}
        eventData={eventData}
      />
      <div id="calendario">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            start: "today prev, next",
            center: "title",
            end: "dayGridMonth, timeGridWeek, timeGridDay",
          }}
          slotMinTime="07:00:00" // Hora de inicio de las ranuras
          slotMaxTime="22:00:00"
          views={{
            timeGrid: {
              allDaySlot: false,
            },
          }}
          dateClick={(info) => {
            console.log(info.date);
          }}
          eventClick={handleEventClick}
          locale={esLocale}
        />
      </div>
    </div>
  );
}

export default Calendar;
