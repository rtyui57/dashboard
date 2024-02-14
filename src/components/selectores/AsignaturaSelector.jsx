import React, { useState, useEffect } from "react";
import AxiosController from "../../utils/AxiosController";

export default function AsignaturaSelector({ changeAsignaturaValue }) {
  const [options, setOptions] = useState(new Map());
  const [selectedOption, setSelectedOption] = useState("");
  const axiosController = AxiosController();

  useEffect(() => {
    axiosController
      .get("/asignatura/nombres")
      .then((response) => {
        setOptions(response.data);
        const [key, value] = Object.entries(response.data)[0];
        changeAsignaturaValue(key);
      })
      .catch((error) => console.error("Error al obtener opciones:", error));
  }, []);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    changeAsignaturaValue(selectedValue);
  };

  return (
    <div className="w-full">
      <select
        className="w-full bg-slate-300 p-1 text-center"
        id="options"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {Object.entries(options).map(([clave, valor]) => (
          <option key={clave} value={clave}>
            {valor}
          </option>
        ))}
      </select>
    </div>
  );
}
