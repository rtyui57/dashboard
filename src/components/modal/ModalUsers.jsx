import Modal from "react-modal";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function ModalListUsers({
  modalIsOpen,
  handleCloseModal,
  renderButton,
  usersAlreadyPresent = [],
}) {
  const [users, setUsers] = useState([]);
  const usersContainedIds = usersAlreadyPresent.map((user) => user.id);
  function getUsers() {
    Axios.get(`http://localhost:8080/user/list`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Modal
      className="modalStyle"
      isOpen={modalIsOpen}
      onRequestClose={() => handleCloseModal()}
      contentLabel="Example Modal"
    >
      <button
        className="border-lime-500 text-xl to-red-400"
        onClick={() => handleCloseModal()}
      >
        X
      </button>
      <h1>List of Users to Choose From</h1>
      <ul className="justify-between">
        {users.map((user) => {
          if (!usersContainedIds.includes(user.id)) {
            return (
              <li>
                <div className="flex p-2">
                  <img
                    src={"data:image/png;base64," + user.icon}
                    alt="User photo"
                    height="45rem"
                    width="45rem"
                  />
                  <h3 className="p-3">{user.username}</h3>
                  {renderButton && renderButton(user)}
                  <button></button>
                </div>
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </Modal>
  );
}
