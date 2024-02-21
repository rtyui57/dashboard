import "./listClassrooms.scss";
import CreateClassroom from "../modal/CreateClassroom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AxiosController from "../../utils/AxiosController";

function ListClassrooms({
  classrooms,
  selectedClassroom,
  selectClassroom,
  building,
  updateData,
}) {
  const [modalIsOpen, setModal] = useState(false);
  const navigate = useNavigate();
  const axiosController = AxiosController();

  function removeBuilding() {
    axiosController
      .delete(`/building/${building}`)
      .then((res) => {
        toast.success("Se elimino", {
          autoClose: 1500,
        });
        setTimeout(() => navigate("/buildings"), 2000);
      })
      .catch((err) => toast.error("Error: " + err));
  }

  function removeAula() {
    axiosController
      .delete(`/building/aula/${selectedClassroom.id}`)
      .then((res) => {
        toast.success("Se elimino", {
          autoClose: 1500,
        });
        updateData();
      })
      .catch((err) => toast.error("Error: " + err));
  }

  return (
    <div className="classroomsList bg-slate-700 h-full">
      <CreateClassroom
        modalIsOpen={modalIsOpen}
        handleCloseModal={() => {
          try {
            setModal(false);
            document.getElementById("calendario").style.zIndex = "auto";
            document.getElementById("calendario").style.position = "static";
          } catch (e) {
            console.log(e);
          }
        }}
        building={building}
        updateData={updateData}
      />
      <div className="actions">List of classrooms</div>
      <div className="flex flex-col justify-between h-full">
        <div className="usersList">
          <button
            className="create"
            onClick={() => {
              setModal(true);
              document.getElementById("calendario").style.zIndex = "-1";
              document.getElementById("calendario").style.position = "relative";
            }}
          >
            +
          </button>
          <button className="remove" onClick={() => selectClassroom(null)}>
            -
          </button>
          {classrooms.map((classroom) => (
            <div
              key={classroom.id}
              className={`userListInfo ${
                selectedClassroom?.name === classroom.name
                  ? "selectedClassroom"
                  : ""
              }`}
              onClick={() => selectClassroom(classroom)}
            >
              <div className="nombre">{classroom.name}</div>
            </div>
          ))}
        </div>
        <div className="p-3 flex flex-col justify-between h-32">
        {selectedClassroom && (
          <button
            className="bg-red-500 w-52 py-2 rounded-md text-white"
            onClick={removeAula}
          >
            Eliminar aula {selectedClassroom.name}
          </button>
        )}
        <button
          className="bg-red-500 w-52 py-2 rounded-md text-white"
          onClick={removeBuilding}
        >
          Eliminar edificio {building}
        </button>
        </div>
        
      </div>
    </div>
  );
}

export default ListClassrooms;
