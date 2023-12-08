import React, { useEffect, useState } from "react";
import AxiosController from "../../utils/AxiosController";

function AulaSelector({ changeAulaValue }) {
  const [options, setOptions] = useState({ nada : "a"});
  const [selectedOption, setSelectedOption] = useState("");
  const axiosController = AxiosController();

  useEffect(() => {
    axiosController
      .get("/building/classrooms")
      .then((response) => {
        setOptions(response.data);
        const [key, value] = Object.entries(response.data)[0];
        changeAulaValue(key);
      })
      .catch((error) => console.error("Error al obtener opciones:", error));
  }, []);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    changeAulaValue(selectedValue);
  };

  return (
    <div className="w-full">
      <select
        className="w-full bg-slate-300 p-1 text-center"
        id="options"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        {Object.entries(options).map(([classId, buildingId]) => (
          <option
            key={classId}
            value={classId}
          >
            {classId}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AulaSelector;
