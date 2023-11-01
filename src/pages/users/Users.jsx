import Sidebar from "../../components/sidebar/Sidebar";
import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "axios";
import "./users.scss";
import { columns } from "./userColumns";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    Axios.get("http://localhost:8080/user/list")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data)
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    console.log("Valor es: " + value)
    setSearchText(value);
    const filteredData = users.filter((user) =>
      Object.keys(user).some(
        (field) =>
          field != 'icon' && typeof user[field] === "string" && user[field].toLowerCase().includes(value)
      )
    );
    setFilteredUsers(searchText == "" ? users : filteredData);
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
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
              // Aquí puedes manejar el cambio de ancho de columna si es necesario
              console.log(params);
            }}
            className="tabla p-2 m-4"
          />
        </div>
      </div>
    </div>
  );
};
export default Users;
