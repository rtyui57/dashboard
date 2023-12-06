import "./listClassrooms.scss";
import CreateClassroom from "../modal/CreateClassroom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ListClassrooms({
  classrooms,
  selectedClassroom,
  selectClassroom,
  building,
}) {
  const [modalIsOpen, setModal] = useState(false);
  const navigate = useNavigate();

  function removeBuilding() {
    axios
      .delete(`http://localhost:8080/building/${building}`)
      .then((res) => {
        toast.success("Se elimino", {
          autoClose: 1500,
        });
        setTimeout(() => navigate("/buildings"), 2000);
      })
      .catch((err) => toast.error("Error: " + err));
  }
  return (
    <div className="classroomsList bg-slate-700 h-full">
      <CreateClassroom
        modalIsOpen={modalIsOpen}
        handleCloseModal={() => {
          setModal(false);
          document.getElementById("calendario").style.zIndex = "auto";
          document.getElementById("calendario").style.position = "static";
        }}
        building={building}
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
        <button
          className="bg-red-500 w-52 py-3 rounded-md text-white"
          onClick={removeBuilding}
        >
          Delete {building}
        </button>
      </div>
    </div>
  );
}

export default ListClassrooms;
