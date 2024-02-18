import React, { useState } from "react";
import "./dataview.scss";
import BLEForm from "./BLEForm";
import { toast } from "react-toastify";
import AxiosController from "../../../utils/AxiosController";

export default function DataView({ building, selectedClassroom }) {
  const [data, setData] = useState({
    ip: "",
    mac: "",
    username: "",
    password: "",
    name: "",
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changedServices, setChangedServices] = useState([]);
  const axios = new AxiosController();

  React.useEffect(() => {
    if (selectedClassroom == null) {
      return;
    }
    axios
      .get(`/building/aula/${selectedClassroom.id}/data`)
      .then((res) => {
        console.log(res.data.services);
        setServices(res.data.services);
        setData(res.data);
      })
      .catch((err) => {
        toast.error("Error al cargar los datos");
      });
  }, [selectedClassroom]);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  function saveData() {
    const value = { ...data, services: services };
    axios
      .post(`/building/aula/${selectedClassroom.id}/data`, value)
      .then((res) => {
        toast.success("Se ha guardado correctamente los datos");
      })
      .catch((err) => {
        toast.error("Error al guardar los datos");
      });
  }

  return (
    <div className="container">
      <form className="formulario" onSubmit={handleSubmit}>
        <label className="entrada">
          Usuario de la Raspberry PI:
          <input
            name="username"
            type="text"
            value={data.username}
            onChange={handleInputChange}
          />
        </label>
        <label className="entrada">
          Password de la Raspberry PI:
          <input
            name="password"
            type="text"
            value={data.password}
            onChange={handleInputChange}
          />
        </label>
        <label className="entrada">
          Dirección IP de la Raspberry PI:
          <input
            name="ip"
            type="text"
            value={data.ip}
            onChange={handleInputChange}
          />
        </label>
        <label className="entrada">
          Dirección MAC de la Raspberry PI:
          <input
            name="mac"
            type="text"
            value={data.mac}
            onChange={handleInputChange}
          />
        </label>
        <label className="entrada">
          Nombre de la Raspberry PI:
          <input
            name="name"
            type="text"
            value={data.name}
            onChange={handleInputChange}
          />
        </label>
        <label className="entrada">
          <div className="servicios">
            Servicios BLE asociados a la Raspberry PI:
            <BLEForm services={services} setServices={setServices} />
          </div>
        </label>
        <button onClick={saveData}>Guardar</button>
      </form>
    </div>
  );
}
