import Modal from "react-modal";
import AxiosController from "../../utils/AxiosController";
import { useState } from "react";
import { toast } from "react-toastify";
function CreateClassroom({
  modalIsOpen,
  handleCloseModal,
  building,
  updateData,
}) {
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
      .then((res) => {
        console.log(res);
        toast.success("Se creo el aula correctamente");
        updateData();
        handleCloseModal();
      })
      .catch((err) => {
        toast.error("Error al crear el aula");
        console.log(err);
      });
  }

  return (
    <Modal
      className="modalStyle bg-white p-3"
      isOpen={modalIsOpen}
      onRequestClose={() => handleCloseModal()}
      contentLabel="Example Modal"
    >
      <h1 className="p-2 text-center">Crear aulario del edificio {building}</h1>
      <div className="flex flex-col">
        <span className="p-2">Nombre</span>
        <input
          className="bg-white"
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={classroom.name}
        />
        <span className="p-2">Capacidad</span>
        <input
          className="bg-white"
          type="number"
          name="capacity"
          id="capacity"
          onChange={handleChange}
          value={classroom.capacity}
        />
        <div className="flex justify-center">
          <button
            className="bg-primarycolor p-2 m-2 rounded-sm text-white"
            onClick={() => handleCloseModal()}
          >
            Cerrar
          </button>
          <button
            className="bg-primarycolor p-2 m-2 rounded-sm text-white"
            onClick={() => postClassroom(building, classroom)}
          >
            Guardar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CreateClassroom;
