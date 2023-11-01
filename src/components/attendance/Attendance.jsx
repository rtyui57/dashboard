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

function Attendance({ fecha, nombre, ocupacion, asistentes, ausentes }) {
  return (
    <div>
      <div className="flex justify-between p-3 px-6">
        <div className="">{fecha}</div>
        <div className="">Clase de {nombre}</div>
        <div className="">Ocupacion: {ocupacion}</div>
      </div>
      {getList("Atendants", asistentes)}
      {getList("Non atendants", ausentes)}
    </div>
  );
}

export default Attendance;
