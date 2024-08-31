import React, { useState } from "react";
import "./sequece.scss";
import AulaSelector from "../../../components/selectores/AulaSelector";
import OneInputSelector from "../../../components/selectores/OneInputSelector";
import AxiosController from "../../../utils/AxiosController";
import { toast } from "react-toastify";

function ScheduleGenerator({ asignaturaName, setKey }) {
  const axiosController = AxiosController();
  const [formData, setFormData] = useState({
    scheduleDay: {},
    startDate: "",
    endDate: "",
    days: [],
    aula: "",
    asignatura: asignaturaName,
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function getButton(day) {
    return (
      <button
        className="day-button"
        type="button"
        onClick={() => handleDayClick(day)}
        style={{
          color: formData.days.includes(day) ? "#0a4382" : "white",
          backgroundColor: formData.days.includes(day) ? "white" : "#0a4382",
        }}
      >
        {day}
      </button>
    );
  }

  function handleDayClick(day) {
    const updatedDays = formData.days.includes(day)
      ? formData.days.filter((selectedDay) => selectedDay !== day)
      : [...formData.days, day];

    setFormData((prevFormData) => ({
      ...prevFormData,
      days: updatedDays,
    }));
  }

  const handleScheduledTimesChange = (e) => {
    const fieldName = e.target.name;
    let value = e.target.value;
    if (value.length === 1) {
      value = "0" + value;
    }
    let updatedScheduleDay = {
      ...formData.scheduleDay,
      [fieldName]: value,
    };

    if (
      updatedScheduleDay.startHour !== undefined &&
      updatedScheduleDay.startMinute !== undefined
    ) {
      updatedScheduleDay.start = `${updatedScheduleDay.startHour}:${updatedScheduleDay.startMinute}:00`;
    }
    if (
      updatedScheduleDay.endHour !== undefined &&
      updatedScheduleDay.endMinute !== undefined
    ) {
      updatedScheduleDay.end = `${updatedScheduleDay.endHour}:${updatedScheduleDay.endMinute}:00`;
    }

    // Actualiza formData con el nuevo scheduleDay
    setFormData((prevFormData) => ({
      ...prevFormData,
      scheduleDay: updatedScheduleDay,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    axiosController
      .post("/horario/sequence", formData)
      .then((response) => {
        toast.success("Horarios generados correctamente");
        setKey((prevKey) => prevKey + 1);
      })
      .catch((error) => {
        toast.error("Error al generar horarios: " + error.response.data);
      });
  }

  function handleAsignaturaChange(selectedAsignatura) {
    setFormData((prevData) => ({
      ...prevData,
      asignatura: selectedAsignatura,
    }));
  }

  function handleAulaChange(selectedAula) {
    setFormData((prevData) => ({
      ...prevData,
      aula: selectedAula,
    }));
  }

  return (
    <div className="formulario">
      <h1 className="p-2 text-center">Generador de Horarios</h1>
      <form onSubmit={handleSubmit}>
        <label className="form-group">
          Título:
          <input type="text" name="titulo" onChange={handleInputChange} />
        </label>
        <label className="form-group">
          Asignatura:
          <div>
            <OneInputSelector
              changeValue={handleAsignaturaChange}
              input={asignaturaName.split("--")[0]}
            />
          </div>
        </label>
        <label className="form-group">
          Aula:
          <div>
            <AulaSelector changeAulaValue={handleAulaChange} />
          </div>
        </label>
        <div className="fechas">
          <label>
            Hora de inicio:
            <input
              className="hora-selector"
              type="number"
              min={0}
              max={23}
              name="startHour"
              value={
                formData.scheduleDay.startHour
                  ? formData.scheduleDay.startHour
                  : "10"
              }
              onChange={handleScheduledTimesChange}
            />
            :
            <input
              className="hora-selector"
              min={0}
              max={59}
              type="number"
              name="startMinute"
              value={
                formData.scheduleDay.startMinute
                  ? formData.scheduleDay.startMinute
                  : "00"
              }
              onChange={handleScheduledTimesChange}
            />
          </label>
          <label>
            Hora de fin:
            <input
              className="hora-selector"
              min={0}
              max={23}
              type="number"
              name="endHour"
              value={
                formData.scheduleDay.endHour
                  ? formData.scheduleDay.endHour
                  : "11"
              }
              onChange={handleScheduledTimesChange}
            />
            :
            <input
              className="hora-selector"
              min={0}
              max={59}
              type="number"
              name="endMinute"
              value={
                formData.scheduleDay.endMinute
                  ? formData.scheduleDay.endMinute
                  : "00"
              }
              onChange={handleScheduledTimesChange}
            />
          </label>
          <label>
            Fecha de inicio:
            <input
              className="date-selector"
              type="date"
              name="startDate"
              value={
                formData.startDate
                  ? formData.startDate
                  : new Date().toISOString().split("T")[0]
              }
              onChange={handleInputChange}
            />
          </label>
          <label>
            Fecha de fin:
            <input
              className="date-selector"
              type="date"
              name="endDate"
              value={
                formData.endDate
                  ? formData.endDate
                  : new Date().toISOString().split("T")[0]
              }
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="days-container">
          {getButton("LUNES")}
          {getButton("MARTES")}
          {getButton("MIERCOLES")}
          {getButton("JUEVES")}
          {getButton("VIERNES")}
          {getButton("SABADO")}
          {getButton("DOMINGO")}
        </div>
        <div className="w-full flex justify-center p-3">
          <button className="submit-button p-3 w-14" type="submit">
            Generar secuencia
          </button>
        </div>
      </form>
    </div>
  );
}

export default ScheduleGenerator;
