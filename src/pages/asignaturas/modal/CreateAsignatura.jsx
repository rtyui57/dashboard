import AxiosController from "../../../utils/AxiosController";
import Modal from "react-modal";
import { useState } from "react";
import { toast } from "react-toastify";
import "../list/asignaturas.scss";

export default function CreateAsignatura({ modalIsOpen, handleCloseModal, refresh }) {
  const [asignatura, setAsignatura] = useState({});
  const axiosController = AxiosController();

  function createAsignatura(event) {
    event.preventDefault();
    axiosController
      .post("/asignatura", asignatura)
      .then((res) => {
        toast.success("Se creo la asignatura");
        setTimeout(refresh(), 2000);  
        handleCloseModal();
        setAsignatura({});
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setAsignatura((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <Modal
      className="modalStyle mainContent bg-white border-2 border-black p-5 w-1/3 h-1/2 border-radius-2"
      isOpen={modalIsOpen}
      onRequestClose={() => handleCloseModal()}
      contentLabel="Example Modal"
    >
      <form action="" onSubmit={createAsignatura}>
        <h1 className="p-1 text-center">Formulario para la creación de una Asignatura</h1>
        <div className="flex flex-col">
          <div className="flex flex-col p-3 justify-evenly">
            <span className="mb-1">Nombre Asignatura</span>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={asignatura.name}
            />
          </div>

          <div className="flex flex-col p-3 justify-evenly">
            <span className="mb-1">Grado</span>
            <input
              type="text"
              name="grado"
              id="grado"
              onChange={handleChange}
              value={asignatura.grado}
            />
          </div>
          <div className="flex flex-col p-3 justify-evenly">
            <span className="mb-1">Curso</span>
            <input
              type="text"
              name="curso"
              id="curso"
              onChange={handleChange}
              value={asignatura.curso}
            />
          </div>
          <div className="flex flex-col p-3 justify-evenly">
            <span className="mb-1">Creditos</span>
            <input
              type="text"
              name="creditos"
              id="creditos"
              onChange={handleChange}
              value={asignatura.creditos}
            />
          </div>
        </div>
        <div className="flex justify-between p-3">
          <button className="accessButton" onClick={() => handleCloseModal()}>
            Cerrar
          </button>
          <button className="accessButton" onClick={createAsignatura}>
            Guardar
          </button>
        </div>
      </form>
    </Modal>
  );
}
