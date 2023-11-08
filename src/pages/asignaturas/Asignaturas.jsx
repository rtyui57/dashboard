import { DataGrid } from "@mui/x-data-grid";
import { asignaturasColumns } from "./asignaturasTable";
import { useEffect, useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

function Asignaturas() {
  const [asignaturas, setAsignaturas] = useState([]);

  useEffect(() => {
   getAsignaturas();
  }, []);

  function getAsignaturas() {
    Axios.get("http://localhost:8080/asignatura")
      .then((res) => {
        console.log(res.data);
        setAsignaturas(res.data);
      })
      .catch((err) => toast.error(err));
  }

  return (
    <div className="a">
      Asignaturas
      <input
        type="text"
        value=""
        className="border-2 border-blue-900 rounded-2xl px-3 py-1"
      />
      <DataGrid
        rows={asignaturas}
        columns={asignaturasColumns}
        onColumnWidthChange={(params) => {
          // Aquí puedes manejar el cambio de ancho de columna si es necesario
          console.log(params);
        }}
        className="tabla p-2 m-4"
      />
    </div>
  );
}

export default Asignaturas;
