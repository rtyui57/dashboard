import Sidebar from "../../components/sidebar/Sidebar";
import UserDetails from "../../components/users/UserDetails";
import ListUsers from "../../components/users/ListUsers";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { getCustomer } from "../login/CookieManager";
import "./users.scss";

const Users = () => {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  function getUsers() {
    Axios.get("http://localhost:8080/user/list", {
      headers: { customer: getCustomer() },
    })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="users">
          <ListUsers users={users} onUserSelect={handleUserSelect} />
          <UserDetails selectedUser={selectedUser} refresh={getUsers} onUserSelect={handleUserSelect}/>
        </div>
      </div>
    </div>
  );
};
export default Users;
