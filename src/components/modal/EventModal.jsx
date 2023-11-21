import Modal from "react-modal";
import Attendance from "../attendance/Attendance";
import { useState, useEffect } from "react";
import Axios from "axios";

function EventModal({ modalIsOpen, handleCloseModal, eventData }) {
  const [event, setEvent] = useState({});

  function getEvent() {
    Axios.get(`http://localhost:8080/horario/${eventData.id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getEvent();
  }, [eventData]);

  console.log(event)
  return (
    <Modal
      className="modalStyle"
      isOpen={modalIsOpen}
      onRequestClose={() => handleCloseModal()}
      contentLabel="Example Modal"
    >
      <button
        className="border-lime-500 text-xl to-red-400"
        onClick={() => handleCloseModal()}
      >
        X
      </button>
      <div className="flex justify-between">
        <p>Fecha de inicio: {event.start}</p>
        <p>Fecha de final: {event.end}</p>
        <p>Titulo: {event.title}</p>
        <p>Clase:  {event.asignatura ? event.asignatura.name : 'Asignatura no disponible'}</p>
        <p>Aula: {event.aula}</p>
      </div>
      <Attendance eventData={eventData} />
    </Modal>
  );
}

export default EventModal;
