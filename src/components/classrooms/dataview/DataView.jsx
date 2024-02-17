import React, { useState } from "react";
import "./dataview.scss";

export default function DataView({ building, selectedClassroom }) {
  const [data, setData] = useState({
    ip: "",
    password: "",
    raspberryIp: "",
    raspberryMac: "",
    services: [],
  });

  const [services, setServices] = useState([]);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddService = () => {
    setServices({
      ...data,
      services: [
        ...data.services,
        {
          id: data.services.length + 1,
          characteristics: [{ id: 1, mode: "read" }], // característica inicial
        },
      ],
    });
  };

  const handleAddCharacteristic = (serviceId) => {
    setData({
      ...data,
      services: data.services.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              characteristics: [
                ...service.characteristics,
                {
                  id: service.characteristics.length + 1,
                  mode: "read",
                },
              ],
            }
          : service
      ),
    });
  };

  const handleDeleteService = (serviceId) => {
    setData({
      ...data,
      services: data.services.filter((service) => service.id !== serviceId),
    });
  };

  const handleDeleteCharacteristic = (serviceId, charId) => {
    setData({
      ...data,
      services: data.services.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              characteristics: service.characteristics.filter(
                (char) => char.id !== charId
              ),
            }
          : service
      ),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos, por ejemplo:
    console.log(data);
  };

  return (
    <div className="container">
      <form className="formulario" onSubmit={handleSubmit}>
        <label className="entrada">
          Usuario de la Raspberry PI:
          <input
            name="ip"
            type="text"
            value={data.ip}
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
            name="raspberryIp"
            type="text"
            value={data.raspberryIp}
            onChange={handleInputChange}
          />
        </label>
        <label className="entrada">
          Dirección MAC de la Raspberry PI:
          <input
            name="raspberryMac"
            type="text"
            value={data.raspberryMac}
            onChange={handleInputChange}
          />
        </label>
        <div className="servicios">
          Servicios BLE asociados a la Raspberry PI:
          {data.services.map((service) => (
            <div className="servicio" key={service.id}>
              <h3>Servicio {service.id}</h3>
              <button onClick={() => handleDeleteService(service.id)}>
                Eliminar Servicio
              </button>
              {service.characteristics.map((char) => (
                <div key={char.id}>
                  <label>
                    Característica {char.id}:
                    <input type="text" value={char.mode} onChange={() => {}} />
                  </label>
                  <label>
                    Modo:
                    <select
                      value={char.mode}
                      onChange={(e) =>
                        setData({
                          ...data,
                          services: data.services.map((s) =>
                            s.id === service.id
                              ? {
                                  ...s,
                                  characteristics: s.characteristics.map((c) =>
                                    c.id === char.id
                                      ? { ...c, mode: e.target.value }
                                      : c
                                  ),
                                }
                              : s
                          ),
                        })
                      }
                    >
                      <option value="read">READ</option>
                      <option value="write">WRITE</option>
                      <option value="write">BOTH</option>
                    </select>
                    <button
                      onClick={() =>
                        handleDeleteCharacteristic(service.id, char.id)
                      }
                    >
                      Eliminar
                    </button>
                  </label>
                </div>
              ))}
              <button onClick={() => handleAddCharacteristic(service.id)}>
                Agregar Característica
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddService}>
            Agregar Servicio
          </button>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
