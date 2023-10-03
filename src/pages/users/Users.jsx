import Sidebar from "../../components/sidebar/Sidebar";
import UserDetails from "../../components/users/UserDetails";
import ListUsers from "../../components/users/ListUsers";
import React, { useState } from 'react';
import "./users.scss";

const Users = () => {

  const [users] = useState([
    { id: 1, name: 'Usuao 1', email: 'usuario1@example.com' },
    { id: 2, name: 'Usuar 2', email: 'usuario2@example.com' },
    { id: 2, name: 'Usuar 2', email: 'usuario2@example.com' },
    { id: 2, name: 'Usuar 2', email: 'usuario2@example.com' },
    { id: 2, name: 'Usuar 2', email: 'usuario2@example.com' },
    { id: 2, name: 'Usuar 2', email: 'usuario2@example.com' },
    { id: 2, name: 'Usuar 2', email: 'usuario2@example.com' },
    { id: 2, name: 'Usuar 2', email: 'usuario2@example.com' },
    { id: 2, name: 'Usuar 2', email: 'usuario2@example.com' },
    { id: 2, name: 'Usuar 2', email: 'usuario2@example.com' },
    { id: 2, name: 'Usuar 2', email: 'usuario2@example.com' },
    { id: 2, name: 'Usuar 2', email: 'usuario2@example.com' },
    { id: 2, name: 'Usuar 2', email: 'usuario2@example.com' },
    { id: 2, name: 'Usuar 2', email: 'usuario2@example.com' },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="users">
          <ListUsers  users={users} onUserSelect={handleUserSelect} />
          <UserDetails  selectedUser={selectedUser}/>
        </div>
      </div>
    </div>
  );
};
export default Users;
