import Modal from "react-modal";
import { useState, useEffect } from "react";
import AxiosController from "../../../utils/AxiosController";
import { toast } from "react-toastify";

export default function ModalListUsers({
  modalIsOpen,
  handleCloseModal,
  asignaturaName,
  usersAlreadyPresent = [],
  reloadData,
}) {
  const [users, setUsers] = useState([]);
  const usersContainedIds = usersAlreadyPresent.map((user) => user.id);
  const axiosController = AxiosController();

  useEffect(() => {
    axiosController
      .get(`/user/list`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  function addUser(username) {
    axiosController
      .post(`/asignatura/${asignaturaName}/user/${username}`)
      .then((res) => {
        toast.success("Added");
        reloadData();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error: " + err.message);
      });
  }
  return (
    <Modal
      className="modalStyle"
      isOpen={modalIsOpen}
      onRequestClose={() => handleCloseModal()}
      contentLabel="Example Modal"
    >
      <h1 className="p-2 text-center">Lista de Usuarios que Añadir</h1>
      <ul className="justify-between text-center align-middle">
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
                  <button
                    className="bg-blue-300 p-2 rounded-md"
                    onClick={() => addUser(user.username, "test")}
                  >
                    Añádir Usuario a Asignatura
                  </button>
                </div>
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
      <button
        className="bg-red-600 text-white p-2 m-5 rounded-md"
        onClick={() => handleCloseModal()}
      >
        Cerrar
      </button>
    </Modal>
  );
}
