import "./attendance.scss";

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

function Attendance({eventData}) {
  return (
    <div>
      <div className="flex justify-between p-3 px-6">
        <div className="">{eventData.start + ""}</div>
        <div className="">{eventData.title}</div>
        <div className="">Ocupacion:</div>
      </div>
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
    </div>
  );
}

export default Attendance;
