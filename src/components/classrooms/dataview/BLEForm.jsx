import React, { useState } from "react";

function BLEService({
  service,
  id,
  characteristics,
  onDelete,
  onAddCharacteristic,
  setServices,
}) {
  const handleAddCharacteristic = () => {
    onAddCharacteristic(id);
  };

  const handleCharInput = (e, id) => {
    characteristics.map((char, index) => {
      char.id === id ? (char.name = e.target.value) : (char.name = char.name);
    });
    setServices((prevServices) =>
      prevServices.map((prevService) =>
        prevService.id === id
          ? { ...prevService, characteristics: characteristics }
          : prevService
      )
    );
  };

  const handleModeChange = (e, charId) => {
    const { value } = e.target;
    const newCharacteristics = characteristics.map((char) =>
      char.id === charId ? { ...char, mode: value } : char
    );
    setServices((prevServices) =>
      prevServices.map((prevService) =>
        prevService.id === id
          ? { ...prevService, characteristics: newCharacteristics }
          : prevService
      )
    );
  };

  const setServiceName = (newName, id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, name: newName } : service
      )
    );
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <div className="titulo">
        <p>Servicio </p>
        <input
          type="text"
          placeholder="Nombre del servicio"
          value={service.name}
          onChange={(e) => setServiceName(e.target.value, service.id)}
        />
      </div>
      <ul>
        {characteristics.map((char, index) => (
          <li key={index}>
            Característica
            <input
              name="charName"
              type="text"
              value={char.name}
              placeholder={char.name}
              onChange={(e) => handleCharInput(e, char.id)}
            />
            Modo
            <select
              name="mode"
              value={char.mode}
              onChange={(e) => handleModeChange(e, char.id)}
            >
              <option value="READ">READ</option>
              <option value="WRITE">WRITE</option>
              <option value="BOTH">BOTH</option>
            </select>
          </li>
        ))}
      </ul>
      <button onClick={() => onDelete(id)}>Eliminar Servicio</button>
      <button onClick={handleAddCharacteristic}>Agregar Característica</button>
    </div>
  );
}

export default function BLEForm({ services, setServices }) {
  const [serviceCount, setServiceCount] = useState(0);

  const handleAddService = () => {
    setServices((prevServices) => [
      ...prevServices,
      {
        id: serviceCount + 1,
        characteristics: [],
      },
    ]);
    setServiceCount((prevCount) => prevCount + 1);
  };

  const handleDeleteService = (serviceId) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== serviceId)
    );
  };

  const handleAddCharacteristic = (serviceId) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              characteristics: [
                ...service.characteristics,
                {
                  name: "Test",
                  mode: "READ",
                  id: service.characteristics.length,
                }, // Puedes inicializar con valores predeterminados si lo deseas
              ],
            }
          : service
      )
    );
  };

  const handleDeleteCharacteristic = (serviceId, characteristicIndex) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              characteristics: service.characteristics.filter(
                (_, index) => index !== characteristicIndex
              ),
            }
          : service
      )
    );
  };

  return (
    <div className="servicio">
      {services.map((service) => (
        <BLEService
          service={service}
          key={service.id}
          id={service.id}
          characteristics={service.characteristics}
          onDelete={handleDeleteService}
          onAddCharacteristic={handleAddCharacteristic}
          setServices={setServices}
        />
      ))}
      <button onClick={handleAddService}>Agregar Servicio</button>
    </div>
  );
}
