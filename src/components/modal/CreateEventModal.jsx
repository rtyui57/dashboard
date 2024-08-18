import Modal from "react-modal";
import moment from "moment";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AsignaturaSelector from "../selectores/AsignaturaSelector";
import AulaSelector from "../selectores/AulaSelector";
import OneInputSelector from "../selectores/OneInputSelector";
import AxiosController from "../../utils/AxiosController";

function CreateEventModal({
  modalIsOpen,
  handleCloseModal,
  info,
  asignatura,
  aula,
  setKey,
}) {
  const [event, setEvent] = useState({
    start: "",
    end: "",
    aula: "",
    asignatura: "",
    title: "",
    color: "black",
  });
  const axiosController = AxiosController();

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
    if (event.title === "") {
      toast.error("El evento debe tener un titulo");
      return;
    }
    axiosController
      .post("/horario", event)
      .then((res) => {
        toast.info("Evento creado");
        if (setKey) {
          setKey((prevKey) => prevKey + 1);
        }
        setTimeout(() => {
          handleCloseModal();
        }, 500);
      })
      .catch((err) => toast.error(err.message));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEvent((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleAsignaturaChange(selectedAsignatura) {
    setEvent((prevEvent) => ({
      ...prevEvent,
      asignatura: selectedAsignatura,
    }));
  }

  function handleAulaChange(selectedAula) {
    setEvent((prevEvent) => ({
      ...prevEvent,
      aula: selectedAula,
    }));
  }

  console.log("Asignatura", asignatura);

  return (
    <Modal
      className="modalStyle p-2 h-96"
      isOpen={modalIsOpen}
      onRequestClose={() => handleCloseModal()}
      contentLabel="Example Modal"
    >
      <h1 className="text-center">Crear un Nuevo Evento</h1>
      <div className="flex flex-col items-center text-center">
        <div className="w-96 flex flex-col justify-center">
          <span className="p-1">Titulo</span>
          <input
            className="border-2 border-solid border-blue-800 rounded-lg"
            type="text"
            name="title"
            id="title"
            value={event.title}
            onChange={handleChange}
          />

          <span className="p-1">Fecha de comienzo: </span>
          <input
            className="border-2 border-solid border-blue-800 rounded-lg"
            type="datetime-local"
            name="start"
            id="start"
            value={event.start}
            onChange={handleChange}
          />

          <span className="p-1">Fecha de finalizacion: </span>
          <input
            className="border-2 border-solid border-blue-800 rounded-lg"
            type="datetime-local"
            name="end"
            id="end"
            value={event.end}
            onChange={handleChange}
          />

          <span className="p-1">Asignatura</span>
          {asignatura !== null ? (
            <OneInputSelector
              changeValue={handleAsignaturaChange}
              input={asignatura}
            />
          ) : (
            <AsignaturaSelector
              changeAsignaturaValue={handleAsignaturaChange}
            />
          )}

          <span className="p-1">Aula</span>
          {aula !== null ? (
            <OneInputSelector changeValue={handleAulaChange} input={aula} />
          ) : (
            <AulaSelector changeAulaValue={handleAulaChange} />
          )}
          <div
            className="flex"
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <input
              id="color"
              name="color"
              type="color"
              value={event.color}
              onChange={handleChange}
              style={{
                width: "100px",
                height: "50px",
                border: "none",
                cursor: "pointer",
                marginRight: "20px", // Espacio entre el input y el div
              }}
            />
            <div
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: event.color,
                color: "#fff",
                textAlign: "center",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Color del Evento
            </div>
          </div>

          <div className="flex justify-between p-3 px-5">
            <button
              className="bg-primarycolor text-white border-2 border-black  rounded-lg py-1 px-2"
              onClick={() => handleCloseModal()}
            >
              Cerrar
            </button>
            <button
              className="bg-primarycolor text-white border-2 border-black  rounded-lg py-1 px-2"
              onClick={() => importEvent()}
            >
              Crear
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CreateEventModal;
