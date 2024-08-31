import { Link } from "react-router-dom";
export const asignaturasColumns = [
  { field: "name", headerName: "Nombre", width: 150 },
  { field: "curso", headerName: "Grado", width: 200 },
  { field: "grado", headerName: "Curso", width: 200 },
  { field: "creditos", headerName: "Número de Creditos", width: 200 },
  {
    field: "Actions",
    headerName: "Acciones",
    renderCell: (params) => {
      return (
        <div className="flex w-full justify-between px-3">
          <Link to={`/asignaturas/${params.row.id}`}>
            <button className="accessButton">Acceder</button>
          </Link>
        </div>
      );
    },
    width: 200,
  },
];
