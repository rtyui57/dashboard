import "./attendance.scss";
import AxiosController from "../../utils/AxiosController";

function deleteEvent(eventId) {
  AxiosController().delete(`http://localhost:8080/horario/${eventId}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function getList(title, usuarios) {
  return (
    <div className="text-center p-2 m-1">
      <h1 className="text-orange-300 pb-2">{title}</h1>
      <div className=" h-40 overflow-y-auto">
        {usuarios.map((usuario) => (
          <ul>{representUser(usuario)}</ul>
        ))}
      </div>
    </div>
  );
}

function representUser(username) {
  return (
    <li>
      <div className="flex justify-around p-1 border-s-orange-100">
        <img
          src="https://static.chollometro.com/threads/raw/dVL88/1147802_1/re/300x300/qt/60/1147802_1.jpg"
          alt=""
          height="50px"
          width="50px"
        />
        <p>{username}</p>
        <p>PROFESOR</p>
      </div>
    </li>
  );
}

function Attendance({ eventData }) {
  return (
    <div>
      {getList("Atendants", [
        "as",
        "sfsadjfkldasjf",
        "adad",
        "as",
        "sfsadjfkldasjf",
        "adad",
      ])}
      {getList("Non atendants", [
        "as",
        "sfsadjfkldasjf",
        "adad",
        "as",
        "sfsadjfkldasjf",
        "adad",
      ])}
      <button
        className="bg-red-600"
        onClick={() => {
          console.log(eventData);
          deleteEvent(eventData.id);
        }}
      >
        Borrar evento
      </button>
    </div>
  );
}

export default Attendance;
