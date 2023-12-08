import AxiosController from "../../utils/AxiosController";
import Modal from "react-modal";
import { useState } from "react";

function createBuilding(building) {
  AxiosController()
    .post("/building", building)
    .then((res) => console.log(res));
}

function CreateBuilding({ modalIsOpen, handleCloseModal }) {
  const [building, setBuilding] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setBuilding((prevData) => ({
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
      <form action="">
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
            className="bg-blue-500 p-2"
            onClick={() => createBuilding(building)}
          >
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

export default CreateBuilding;
