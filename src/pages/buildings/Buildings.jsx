import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Buildings = () => {
  const [buildings, setBuildings] = useState([]);
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

  const divs = buildings.map((elemento, index) => (
    <Link to={elemento.name}>
      <div>{elemento.name}</div>
    </Link>
  ));
  
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">Estas son las categorias: {divs}</div>
    </div>
  );
};

export default Buildings;
