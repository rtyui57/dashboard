import React, { useState } from "react";
import Modal from "react-modal";
import AxiosController from "../../utils/AxiosController";

function createEvent(event, username) {
  AxiosController().post(`/user/${username}/horario`, event)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

const EventFormModal = ({ isOpen, closeModal, username }) => {
  const [eventData, setEventData] = useState({
    title: "",
    start: "",
    end: "",
    clase: "",
    encargado: "",
    descripcion: "",
    color: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEventData = {
      ...eventData,
      startDate: eventData.startDate + ":00.000Z",
      endDate: eventData.endDate + ":00.000Z",
    };
    createEvent(updatedEventData, username);
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      className="w-50 h-80 ml-96 mt-40 text-center border border-y-red-950 bg-slate-300"
    >
      <h2>Agregar Evento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha de inicio:</label>
          <input
            type="datetime-local"
            name="start"
            value={eventData.start}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Fecha de fin:</label>
          <input
            type="datetime-local"
            name="end"
            value={eventData.end}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Clase:</label>
          <input
            className="border border-black"
            type="text"
            name="clase"
            value={eventData.clase}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Encargado:</label>
          <input
            className="border border-black"
            type="text"
            name="encargado"
            value={eventData.encargado}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <input
            className="border border-black"
            type="text"
            name="descripcion"
            value={eventData.descripcion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Color:</label>
          <input type="color" value={eventData.color} onChange={handleChange} />
        </div>
        <button type="submit">Guardar</button>
      </form>
      <button onClick={closeModal}>Cerrar</button>
    </Modal>
  );
};

export default EventFormModal;
