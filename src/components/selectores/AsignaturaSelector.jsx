import React, { useState, useEffect } from "react";
import axios from "axios";

function AsignaturaSelector({ onAsignaturaChange }) {
  const [options, setOptions] = useState(["Asas"]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/asignatura/nombres")
      .then((response) => setOptions(response.data))
      .catch((error) => console.error("Error al obtener opciones:", error));
  }, []);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue)
    onAsignaturaChange(selectedValue);
  };

  return (
    <div className="w-full">
      <select className="w-full bg-slate-300 p-1 text-center" id="options" value={selectedOption} onChange={handleSelectChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AsignaturaSelector;
