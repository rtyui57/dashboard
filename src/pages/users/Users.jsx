import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "axios";
import "./users.scss";
import { columns } from "./userColumns";
import { useAuth } from "../../context/AuthContext";
const Users = () => {
  const { getAuth } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    console.log(localStorage.getItem("token"))
    console.log(getAuth())
    Axios.get("http://localhost:8080/user/list", {
      headers: {Authorization : `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true,
    })
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    console.log("Valor es: " + value);
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
          // Aquí puedes manejar el cambio de ancho de columna si es necesario
          console.log(params);
        }}
        className="tabla p-2 m-4"
      />
    </div>
  );
};
export default Users;
