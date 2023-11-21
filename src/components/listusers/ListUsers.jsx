import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "../../pages/users/userColumns";

function ListUsers({users, title}) {
  console.log("terngo los usuarios: " + users)
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

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
       {title}
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleSearch}
        />
        <button>Crear</button>
      </div>
      <DataGrid
        rows={filteredUsers}
        columns={columns}
        onColumnWidthChange={(params) => {
          // Aquí puedes manejar el cambio de ancho de columna si es necesario
          console.log(params);
        }}
        className="tabla p-2 m-4"
      />
    </div>
  );
}

export default ListUsers;
