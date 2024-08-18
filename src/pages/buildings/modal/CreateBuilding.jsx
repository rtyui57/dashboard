import AxiosController from "../../../utils/AxiosController";
import Modal from "react-modal";
import { useState } from "react";
import { toast } from "react-toastify";

function CreateBuilding({ modalIsOpen, handleCloseModal, refresh }) {
  const [building, setBuilding] = useState({});
  const axiosController = AxiosController();

  function createBuilding(building) {
    axiosController.post("/building", building).then((res) => {
      toast.success("Se creo el edificio correctamente");
      refresh();
      handleCloseModal();
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setBuilding((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <Modal
      className="modalStyle bg-white p-5 border-cyan-500"
      isOpen={modalIsOpen}
      onRequestClose={() => handleCloseModal()}
      contentLabel="Example Modal"
    >
      <div>
        <h1 className="p-3 text-center">Crear Nuevo Edificio</h1>
        <div className="flex flex-col">
          <span>Nombre edificio</span>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={building.name}
          />
          <span>Plantas</span>
          <input
            type="text"
            name="plantas"
            id="plantas"
            onChange={handleChange}
            value={building.plantas}
          />
        </div>
        
        <div className="flex justify-between p-3">
        <button
            className="addBuilding"
            onClick={() => handleCloseModal()}
          >
            Cerrar
          </button>
          <button
            className="addBuilding"
            onClick={() => createBuilding(building)}
          >
            Guardar
          </button>
         
        </div>
      </div>
    </Modal>
  );
}

export default CreateBuilding;
