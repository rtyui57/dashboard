import { Link } from "react-router-dom";
export const asignaturasColumns = [
  { field: "name", headerName: "Nombre", width: 150 },
  { field: "displayName", headerName: "Display Name", width: 200 },
  { field: "curso", headerName: "Curso", width: 140 },
  { field: "grado", headerName: "Grado", width: 140 },
  { field: "creditos", headerName: "Numeor de Creditos", width: 200 },
  {
    field: "Actions",
    headerName: "Actions",
    renderCell: (params) => {
      return (
        <div className="flex w-full justify-between px-3">
          <Link to={`/asignaturas/${params.row.id}`}>
            <button className="editUser rounded-md bg-red-400 px-3 py-1">Ver</button>
          </Link>
        </div>
      );
    },
    width: 200,
  },
];
