import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./buildings.scss";
import CreateBuilding from "../modal/CreateBuilding";
import AxiosController from "../../../utils/AxiosController";

const Buildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const axiosController = AxiosController();

  useEffect(() => {
    getBuildings();
  }, [refresh]);

  function getBuildings() {
    axiosController
      .get("/building")
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
        refresh={() => {
          setRefresh(!refresh);
        }}
      />
      <div className="flex justify-between p-2">
        <button
          onClick={() => {
            setModalIsOpen(true);
          }}
          className="addBuilding"
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
