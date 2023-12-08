import Modal from "react-modal";
import AxiosController from "../../utils/AxiosController";
import { useState } from "react";

function CreateClassroom({ modalIsOpen, handleCloseModal, building }) {
  const [classroom, setClassroom] = useState({});
  const axiosController = AxiosController();

  function handleChange(e) {
    const { name, value } = e.target;
    setClassroom((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function postClassroom(id, clasroom) {
    axiosController
      .post(`/building/${id}/classroom`, clasroom)
      .then((res) => console.log(res));
  }

  return (
    <Modal
      className="modalStyle"
      isOpen={modalIsOpen}
      onRequestClose={() => handleCloseModal()}
      contentLabel="Example Modal"
    >
      <h1>Crear aulario del edificio {building}</h1>
      <form className="flex flex-col">
        <span>Name</span>
        <input
          className="bg-red-400"
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={classroom.name}
        />
        <span>Capacidad</span>
        <input
          className="bg-red-400"
          type="number"
          name="capacity"
          id="capacity"
          onChange={handleChange}
          value={classroom.capacity}
        />
        <div className="flex justify-center">
          <button
            className="bg-blue-600 p-2 m-2"
            onClick={() => postClassroom(building, classroom)}
          >
            Save
          </button>
          <button
            className="bg-blue-600 p-2 m-2"
            onClick={() => handleCloseModal()}
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default CreateClassroom;
