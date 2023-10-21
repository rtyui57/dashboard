import Sidebar from "../../components/sidebar/Sidebar";
import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "axios";
import "./users.scss";
import { columns } from "./userColumns";

const Users = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8080/user/list")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  });

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="users">
          <div className="user_header">
            Lista De Usuarios
            <button>Crear</button>
          </div>
          <DataGrid
            rows={users}
            columns={columns}
            onColumnWidthChange={(params) => {
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
