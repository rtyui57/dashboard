import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./buildings.scss";
import CreateBuilding from "../../components/modal/CreateBuilding";

const Buildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    getBuildings();
  }, []);

  function getBuildings() {
    Axios.get("http://localhost:8080/building")
      .then((response) => {
        setBuildings(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="">
      <CreateBuilding
        modalIsOpen={modalIsOpen}
        handleCloseModal={() => {
          setModalIsOpen(false);
        }}
      />
      <div className="flex justify-between p-2">
        <button
          onClick={() => {
            setModalIsOpen(true);
          }}
          className="bg-blue-400 text-white p-2 rounded-lg"
        >
          Crear building
        </button>
        <h1>Lista de Edificios</h1>
        <div className=""></div>
      </div>

      <div className="cuadrados-grid">
        {buildings.map((building) => (
          <Link to={building.id}>
            <div className="cuadrado no-underline">{building.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Buildings;
