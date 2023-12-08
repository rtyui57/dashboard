import AxiosController from "../../utils/AxiosController";
import Modal from "react-modal";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateAsignatura({ modalIsOpen, handleCloseModal }) {
  const [asignatura, setAsignatura] = useState({});
  const axiosController = AxiosController();

  function createAsignatura(event) {
    axiosController
      .post("/asignatura", asignatura)
      .then((res) => toast.success("Se creo la asignatura"))
      .catch((err) => toast.error(err.message));
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
      className="modalStyle"
      isOpen={modalIsOpen}
      onRequestClose={() => handleCloseModal()}
      contentLabel="Example Modal"
    >
      <form action="" onSubmit={createAsignatura}>
        <div className="flex flex-col">
          <span>Nombre Asignatura</span>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={asignatura.name}
          />
          <span>Grado</span>
          <input
            type="text"
            name="grado"
            id="grado"
            onChange={handleChange}
            value={asignatura.grado}
          />
          <span>Curso</span>
          <input
            type="text"
            name="curso"
            id="curso"
            onChange={handleChange}
            value={asignatura.curso}
          />
          <span>Creditos</span>
          <input
            type="text"
            name="creditos"
            id="creditos"
            onChange={handleChange}
            value={asignatura.creditos}
          />
        </div>
        <div className="flex justify-between p-3">
          <button className="bg-blue-500 p-2" onClick={createAsignatura}>
            Save
          </button>
          <button
            className="bg-blue-500 p-2"
            onClick={() => handleCloseModal()}
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
}
