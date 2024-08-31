import { Link } from "react-router-dom";
export const columns = [
  { field: "username", headerName: "Usuario", width: 150 },
  {
    field: "icon",
    headerName: "Perfil",
    width: 100,
    renderCell: (params) => {
      return (
        <img
          className="cellImg"
          src={
            params.row.icon?.startsWith("data:image/jpeg;base64,")
              ? params.row.icon
              : `data:image/jpeg;base64,${params.row.icon}`
          }
          alt="avatar"
        />
      );
    },
  },
  { field: "firstName", headerName: "Nombre", width: 200 },
  { field: "lastName", headerName: "Apellidos", width: 200 },
  { field: "email", headerName: "Email", width: 200 },

  { field: "edad", headerName: "Edad", width: 100 },
  { field: "puesto", headerName: "Cargo", width: 140 },
  {
    field: "Actions",
    headerName: "Actions",
    renderCell: (params) => {
      return (
        <div className="flex w-full justify-between px-3">
          <Link to={`/users/${params.row.id}`}>
            <button className="editUser">Acceder</button>
          </Link>
        </div>
      );
    },
    width: 200,
  },
  { field: "description", headerName: "Descripcion", width: 350 },
];
