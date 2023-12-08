import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid"
import "./users.scss";
import { columns } from "./userColumns";
import AxiosController from "../../utils/AxiosController";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const controller = AxiosController();

  useEffect(() => {
    controller
      .get("/user/list")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

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
    setFilteredUsers(searchText == "" ? users : filteredData);
  };

  return (
    <div className="users">
      <div className="user_header">
        Lista De Usuarios
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
          console.log(params);
        }}
        className="tabla p-2 m-4"
      />
    </div>
  );
};
