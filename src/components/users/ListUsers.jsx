import "./listUsers.scss";
import { getCustomer } from "../../pages/login/CookieManager";
import defaultIcon from "../../utils/DefaultVars";

const ListUsers = ({ users, onUserSelect }) => {
  return (
    <div className="usersContainer">
      <div className="actions">List of users of customer {getCustomer()}</div>
      <div className="usersList">
        <button className="create">+</button>
        <button className="remove">-</button>
        {users.map((user) => (
          <div className="userListInfo">
            <div className="logo">
              <img src={defaultIcon()}></img>
            </div>
            <div className="nombre">{user.name}</div>
            <input type="checkbox" className="checkbox-input"  onChange={() => onUserSelect(user)}/>
            <span className="checkbox-checkmark" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListUsers;
