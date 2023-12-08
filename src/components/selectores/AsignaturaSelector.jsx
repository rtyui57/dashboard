import React, { useState, useEffect } from "react";
import AxiosController from "../../utils/AxiosController";

export default function AsignaturaSelector({ changeAsignaturaValue }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const axiosController = AxiosController();

  useEffect(() => {
    axiosController
      .get("/asignatura/nombres")
      .then((response) => {
        setOptions(response.data);
        changeAsignaturaValue(response.data[0]);
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
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}