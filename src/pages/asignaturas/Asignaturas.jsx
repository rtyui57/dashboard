import { DataGrid } from "@mui/x-data-grid";
import { asignaturasColumns } from "./asignaturasTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateAsignatura from "../../components/modal/CreateAsignatura";
import AxiosController from "../../utils/AxiosController";

function Asignaturas() {
  const [asignaturas, setAsignaturas] = useState([]);
  const [filteredAsig, setFilteredAsig] = useState([]);
  const [search, setSearch] = useState(null);
  const [modalIsOpen, setModalOpen] = useState(false);
  const axiosController = AxiosController();

  useEffect(() => {
    getAsignaturas();
  }, []);

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
    axiosController.get("/asignatura")
      .then((res) => {
        setAsignaturas(res.data);
        setFilteredAsig(res.data)
      })
      .catch((err) => toast.error(err));
  }

  return (
    <div className="w-full">
      <div className="p-3 flex justify-between">
        <div className="flex ml-28">
          <h1 className="p-1 m-2">Asignaturas</h1>
          <input
            type="text"
            className="border-2 border-blue-900 rounded-2xl p-1"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="p-2 bg-blue-600 rounded-md text-white mr-14"
        >
          Create asignatura
        </button>
      </div>
      <CreateAsignatura
        modalIsOpen={modalIsOpen}
        handleCloseModal={() => setModalOpen(false)}
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
