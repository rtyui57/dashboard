import React, { useState } from "react";
import Modal from "react-modal";
import Axios from "axios";

function createEvent(event, username) {
  Axios.post(`http://localhost:8080/user/${username}/horario`, event)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

const EventFormModal = ({ isOpen, closeModal, username }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent(
      {
        start: startDate + ":00.000Z",
        end: endDate + ":00.000Z",
        title: title,
      },
      username
    );
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <h2>Agregar Evento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de inicio:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de fin:</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label>Clase:</label>
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label>Encargado:</label>
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label>Descripcion:</label>
          <input
            type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
      <button onClick={closeModal}>Cerrar</button>
    </Modal>
  );
};

export default EventFormModal;
