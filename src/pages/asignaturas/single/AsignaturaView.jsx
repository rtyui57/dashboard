import { useParams } from "react-router-dom";
import Selector from "../../../components/selector/Selector";
import { useState, useEffect } from "react";
import Calendar from "../../../components/calendar/Calendar";
import ListUsers from "../../../components/listusers/ListUsers";
import { toast } from "react-toastify";
import ModalListUsers from "../modal/ModalUsers";
import AxiosController from "../../../utils/AxiosController";
import { useAuth } from "../../../context/AuthContext";
import ScheduleGenerator from "../sequence/SequenceManager";

function AsignaturaView() {
  const { role } = useAuth();
  const VIEWS =
    role === "ADMIN"
      ? {
          EDICION: "EDICION",
          CALENDARIO: "CALENDARIO",
          ALUMNOS: "ALUMNOS",
          PROFESORES: "PROFESORES",
          SEQUENCE: "SEQUENCE",
        }
      : {
          CALENDARIO: "CALENDARIO",
          ALUMNOS: "ALUMNOS",
          PROFESORES: "PROFESORES",
          SEQUENCE: "SEQUENCE",
        };
  const [view, setView] = useState(VIEWS.EDICION);
  const { asignaturaName } = useParams();
  const [asignatura, setAsignatura] = useState(null);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const axiosController = AxiosController();

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setAsignatura((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  useEffect(() => {
    getAsignatura();
  }, [reloadData]);

  function saveAsignatura() {
    const { profesores, alumnos, horarios, ...asig } = asignatura;
    axiosController
      .post("/asignatura", asig)
      .then((res) => {
        toast.success("Asignatura actualizada");
        setTimeout(500, () => getAsignatura());
      })
      .catch((err) => toast.error(err.message));
  }

  function deleteAsignatura() {
    axiosController
      .delete(`/asignatura/${asignaturaName}`)
      .then((res) => toast.success("Asignatura eliminada"))
      .catch((err) => toast.error(err.message));
  }

  function getAsignatura() {
    axiosController
      .get(`/asignatura/${asignaturaName}`)
      .then((response) => {
        setAsignatura(response.data);
      })
      .catch((error) => toast.error(error));
  }

  function actionsContent(params) {
    return (
      <div className="flex w-full justify-between px-3">
        <button
          className="editUser"
          onClick={() => {
            if (view == VIEWS.ALUMNOS) {
              axiosController
                .delete(
                  `http://localhost:8080/asignatura/${asignaturaName}/alumno/${params.row.username}`
                )
                .then((res) =>
                  toast.success("Se elimino el usuario " + params.row.username)
                )
                .catch((err) => toast.error(err));
            } else {
              axiosController
                .delete(
                  `http://localhost:8080/asignatura/${asignaturaName}/profesor/${params.row.username}`
                )
                .then((res) =>
                  toast.success("Se elimino el usuario " + params.row.username)
                )
                .catch((err) => toast.error(err));
            }
            setReloadData(true);
          }}
        >
          Eliminar
        </button>
        <button className="editUser">Olfd</button>
      </div>
    );
  }

  function getForm() {
    return (
      <div className="flex flex-col items-center justify-center p-3">
        <div className="flex flex-col items-start">
          <div className="flex items-center mb-2">
            <label className="p-2 mr-2">Nombre</label>
            <input
              className="p-2 mr-2 border border-black"
              type="text"
              value={asignatura?.name}
              name="name"
              id="name"
              onChange={handleChangeInput}
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="p-2 mr-2">Display Name</label>
            <input
              className="p-2 mr-2 border border-black"
              type="text"
              value={asignatura?.displayName}
              name="displayName"
              id="displayName"
              onChange={handleChangeInput}
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="p-2 mr-2">Curso</label>
            <input
              className="p-2 mr-2 border border-black"
              type="text"
              value={asignatura?.curso}
              name="curso"
              id="curso"
              onChange={handleChangeInput}
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="p-2 mr-2">Degree</label>
            <input
              className="p-2 mr-2 border border-black"
              type="text"
              value={asignatura?.grado}
              name="grado"
              id="grado"
              onChange={handleChangeInput}
            />
          </div>
          <div className="flex items-center mb-2">
            <label className="p-2 mr-2">Creditos</label>
            <input
              className="p-2 mr-2 border border-black"
              type="number"
              value={asignatura?.creditos}
              name="creditos"
              id="creditos"
              onChange={handleChangeInput}
            />
          </div>
          <div className="flex justify-between w-48 p-2 mt-6">
            <button
              className="bg-green-500 p-2 rounded-md text-white"
              onClick={saveAsignatura}
            >
              Save
            </button>
            <button
              className="bg-red-700 p-2 rounded-md"
              onClick={deleteAsignatura}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="a">
      <Selector
        views={Object.values(VIEWS)}
        setView={setView}
        currentView={view}
      />
      {view === VIEWS.EDICION && getForm()}
      {view == VIEWS.CALENDARIO && (
        <Calendar events={asignatura?.horarios} asignatura={asignaturaName} />
      )}
      {view == VIEWS.PROFESORES && (
        <div className="">
          <button
            className="p-2 mx-3 mt-1 bg-blue-500 rounded-md"
            onClick={() => setModalOpen(true)}
          >
            Add Profesor
          </button>
          <ModalListUsers
            modalIsOpen={modalIsOpen}
            handleCloseModal={() => setModalOpen(false)}
            asignaturaName={asignaturaName}
            usersAlreadyPresent={
              asignatura == null ? [] : asignatura.profesores
            }
          />
          <ListUsers
            users={asignatura == null ? [] : asignatura.profesores.concat(asignatura.alumnos)}
            title={"PROFESORES"}
            actionsContent={actionsContent}
          />
        </div>
      )}
      {view == VIEWS.ALUMNOS && (
        <div className="">
          <button
            className="p-2 mx-3 mt-1 bg-blue-500 rounded-md"
            onClick={() => setModalOpen(true)}
          >
            Add Alumno
          </button>
          <ModalListUsers
            modalIsOpen={modalIsOpen}
            handleCloseModal={() => setModalOpen(false)}
            asignaturaName={asignaturaName}
            usersAlreadyPresent={asignatura == null ? [] : asignatura.alumnos.concat(asignatura.profesores)}
          />
          <ListUsers
            users={asignatura == null ? [] : asignatura.alumnos}
            title={"ESTUDIANTES"}
            actionsContent={actionsContent}
          />
        </div>
      )}
      {view == VIEWS.SEQUENCE && (
        <ScheduleGenerator asignatura={asignaturaName} />
      )}
    </div>
  );
}

export default AsignaturaView;
