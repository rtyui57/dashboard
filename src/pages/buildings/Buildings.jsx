import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./buildings.scss";
import CreateBuilding from "../../components/modal/CreateBuilding";

function genBuilding(name) {
  return (
    <Link to={name}>
      <div className="cuadrado">{name}</div>
    </Link>
  );
}

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
      <button
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        Crear building
      </button>
      <div className="cuadrados-grid">
        {buildings.map((elemento) => genBuilding(elemento.name))}
      </div>
    </div>
  );
};

export default Buildings;
