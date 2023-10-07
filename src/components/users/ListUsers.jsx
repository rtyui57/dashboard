import "./listUsers.scss";
import { getCustomer } from "../../pages/login/CookieManager";
import defaultIcon from "../../utils/DefaultVars";

function agregarCirculoRelleno(id) {
  console.log("ID" + id)
  var circulo = document.getElementById(id);
  circulo.classList.add("visible");
}

const ListUsers = ({ users, onUserSelect }) => {

  function onCreateUser() {
    const user = {action : "createUser"}
    onUserSelect(user)
  }

  return (
    <div className="usersContainer">
      <div className="actions">List of users of customer {getCustomer()}</div>
      <div className="usersList">
        <button className="create" onClick={onCreateUser}>+</button>
        <button className="remove">-</button>
        {users.map((user) => (
          <a>
            <div className="userListInfo">
              <div className="logo">
                <img src={defaultIcon()}></img>
              </div>
              <div className="nombre">{user.username}</div>
              <button
                className="boton-con-svg"
                onClick={() => {
                  onUserSelect(user);
                  agregarCirculoRelleno(user.username);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <circle id={user.username} cx="12" cy="11" r="10" />
                </svg>
              </button>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ListUsers;
