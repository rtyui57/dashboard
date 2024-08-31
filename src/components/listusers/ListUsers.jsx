import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

function getColumns(actionsContent) {
  return [
    {
      field: "username",
      headerName: "Usuario",
      width: 150,
      renderCell: (params) => (
        <Link to={`/users/${params.row.id}`}>
          <h3>{params.row.username}</h3>
        </Link>
      ),
    },
    {
      field: "icon",
      headerName: "Perfil",
      width: 100,
      renderCell: (params) => {
        console.log(params);
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
    { field: "puesto", headerName: "Cargo", width: 140 },
    {
      field: "Actions",
      headerName: "Actions",
      renderCell: (params) => actionsContent(params),
      width: 200,
    },
    { field: "description", headerName: "Descripcion", width: 150 },
  ];
}

function ListUsers({ users, title, actionsContent = null }) {
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  if (actionsContent === null) {
    actionsContent = (params) => {
      return (
        <div className="flex w-full justify-between px-3">
          <Link to={`/users/${params.row.id}`}>
            <button className="editUser">Editar</button>
          </Link>
          <Link to={`/users/${params.row.id}/horario`}>
            <button className="editUser">Horario</button>
          </Link>
        </div>
      );
    };
  }

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    const filteredData = users.filter((user) =>
      Object.keys(user).some(
        (field) =>
          field != "icon" &&
          typeof user[field] === "string" &&
          user[field].toLowerCase().includes(value)
      )
    );
    setFilteredUsers(searchText === "" ? users : filteredData);
  };

  return (
    <div className="users">
      <div className="user_header">
        <h2>{title}</h2>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <DataGrid
        rows={filteredUsers}
        columns={getColumns(actionsContent)}
        onColumnWidthChange={(params) => {
          console.log(params);
        }}
        className="tabla p-2 m-4"
      />
    </div>
  );
}

export default ListUsers;
