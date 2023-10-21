export const columns = [
  { field: "username", headerName: "Usuario", width: 100 },
  {
    field: "icon",
    headerName: "Perfil",
    width: 100,
    renderCell: (params) => {
      return (
        <img
          className="cellImg"
          src={"data:image/jpeg;base64," + params.row.icon}
          alt="avatar"
        />
      );
    },
  },
  { field: "firstName", headerName: "Nombre", width: 200 },
  { field: "lastName", headerName: "Apellidos", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
 
  { field: "edad", headerName: "Edad", width: 100 },
  { field: "puesto", headerName: "Cargo", width: 100 },
  {
    field: "Actions",
    headerName: "Actions",
    renderCell: (params) => {
      return <button className="editUser">Editar</button>;
    },
  },
  { field: "description", headerName: "Descripcion", width: 350 },
];
