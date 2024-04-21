import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import "./calendar.scss";
import { useState, useEffect } from "react";
import esLocale from "@fullcalendar/core/locales/es";
import EventModal from "../modal/EventModal";
import CreateEventModal from "../modal/CreateEventModal";
import { useNavigate } from "react-router-dom";

function Calendar({ events, asignatura = null, aula = null, setKey, key = 1 }) {
  console.log("Renderizado el calendar " + events);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventData, setEventData] = useState({});
  const [eventModalIsOpen, setEventModalIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({});
  const navigate = useNavigate();

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
      <CreateEventModal
        modalIsOpen={eventModalIsOpen}
        handleCloseModal={() => {
          setEventModalIsOpen(false);
          document.getElementById("calendario").style.zIndex = "auto";
          document.getElementById("calendario").style.position = "static";
        }}
        info={newEvent}
        aula={aula}
        asignatura={asignatura}
        setKey={setKey}
      />
      <div id="calendario">
        <FullCalendar
          key={key}
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
            document.getElementById("calendario").style.zIndex = "-1";
            document.getElementById("calendario").style.position = "relative";
            setEventModalIsOpen(true);
            setNewEvent(info);
          }}
          eventClick={(info) => {
            navigate(`/event/${info.event._def.publicId}`);
          }}
          locale={esLocale}
        />
      </div>
    </div>
  );
}

export default Calendar;
