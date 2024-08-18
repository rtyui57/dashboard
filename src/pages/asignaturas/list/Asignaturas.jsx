import { DataGrid } from "@mui/x-data-grid";
import { asignaturasColumns } from "./asignaturasTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateAsignatura from "../modal/CreateAsignatura";
import AxiosController from "../../../utils/AxiosController";
import { useAuth } from "../../../context/AuthContext";
import './asignaturas.scss'

function Asignaturas() {
  const { role } = useAuth();
  const [asignaturas, setAsignaturas] = useState([]);
  const [filteredAsig, setFilteredAsig] = useState([]);
  const [search, setSearch] = useState(null);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const axiosController = AxiosController();

  useEffect(() => {
    getAsignaturas();
  }, [refresh]);

  function handleSearch(event) {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    const filteredData = asignaturas.filter((asig) =>
      Object.keys(asig).some((field) => {
        const fieldValue = asig[field];
        if (fieldValue.toString().toLowerCase().includes(value)) {
          return true;
        } else {
          return false;
        }
      })
    );
    setFilteredAsig(search == "" ? asignaturas : filteredData);
  }

  function getAsignaturas() {
    axiosController.get(`/asignatura?filterResults=${role!=='ADMIN'}`)
      .then((res) => {
        setAsignaturas(res.data);
        setFilteredAsig(res.data)
      })
      .catch((err) => toast.error(err));
  }

  return (
    <div className="w-full mainContent">
      <div className="p-3 flex justify-between">
        <div className="flex ml-28">
          <h1 className="p-1 m-2">{role === "PROFESOR" ? "Asignaturas que imparte" : "Asignaturas que estudias"}</h1>
          <input
            type="text"
            placeholder="Buscar"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="accessButton"
        >
          Create asignatura
        </button>
      </div>
      <CreateAsignatura
        modalIsOpen={modalIsOpen}
        handleCloseModal={() => setModalOpen(false)}
        refresh={() => setRefresh(!refresh)}
      />
      <DataGrid
        rows={filteredAsig}
        columns={asignaturasColumns}
        onColumnWidthChange={(params) => {
          console.log(params);
        }}
        className="tabla p-2 m-4"
      />
    </div>
  );
}

export default Asignaturas;
