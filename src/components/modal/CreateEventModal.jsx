import Modal from "react-modal";
import moment from "moment";
import { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import AsignaturaSelector from "../selectores/AsignaturaSelector";
import { func } from "prop-types";

function CreateEventModal({ modalIsOpen, handleCloseModal, info }) {
  const [event, setEvent] = useState({
    start: "",
    end: "",
    clase: "",
    asignatura: "",
    title: "",
  });

  useEffect(() => {
    const startDate = moment(info.date).format("YYYY-MM-DDTHH:mm");
    const endDate = moment(info.date)
      .add(30, "minutes")
      .format("YYYY-MM-DDTHH:mm");
    setEvent((prevEvent) => ({
      ...prevEvent,
      start: startDate,
      end: endDate,
    }));
  }, [info.date]);

  function importEvent() {
    console.log("Se va a realizar el Import del horario");
    console.log(event);
    Axios.post("http://localhost:8080/horario", event)
      .then((res) => toast.info("Creado"))
      .catch((err) => toast.error(err));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEvent((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleAsignaturaChange(selectedAsignatura) {
    console.log("Seleccionado: " + selectedAsignatura)
    setEvent((prevEvent) => ({
      ...prevEvent,
      asignatura: selectedAsignatura,
    }));
  }

  return (
    <Modal
      className="modalStyle"
      isOpen={modalIsOpen}
      onRequestClose={() => handleCloseModal()}
      contentLabel="Example Modal"
    >
      <h1 className="text-center">Create a New Event</h1>
      <form action="" className="flex flex-col items-center text-center">
        <div className="w-96 flex flex-col justify-center">
          <span className="p-2">Titulo</span>
          <input
            className="border-2 border-solid border-blue-800 m-1 rounded-lg"
            type="text"
            name="title"
            id="title"
            value={event.title}
            onChange={handleChange}
          />
          <span className="p-2">Fecha de comienzo: </span>
          <input
            className="border-2 border-solid border-blue-800 m-1 rounded-lg"
            type="datetime-local"
            name="start"
            id="start"
            value={event.start}
            onChange={handleChange}
          />
          <span className="p-2">Fecha de finalizacion: </span>
          <input
            className="border-2 border-solid border-blue-800 m-1 rounded-lg"
            type="datetime-local"
            name="end"
            id="end"
            value={event.end}
            onChange={handleChange}
          />
          <span className="p-2">Asignatura</span>
          <AsignaturaSelector onAsignaturaChange={handleAsignaturaChange}/>
          <span className="p-2">Aula</span>
          <input
            className="border-2 border-solid border-blue-800 m-1 rounded-lg"
            type="text"
            name="clase"
            id="clase"
            value={event.clase}
            onChange={handleChange}
          />

          <div className="flex justify-between p-3 px-5">
            <button
              className="bg-blue-700 text-white border-2 border-black  rounded-lg py-1 px-2"
              onClick={() => handleCloseModal()}
            >
              Cerrar
            </button>
            <button
              className="bg-blue-700 text-white border-2 border-black  rounded-lg py-1 px-2"
              onClick={() => importEvent()}
            >
              Crear
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default CreateEventModal;
