import "./listClassrooms.scss";

function ListClassrooms({ classrooms, selectClassroom }) {
  return (
    <div className="classroomsList bg-slate-700 h-full">
      <div className="actions">List of classrooms</div>
      <div className="usersList">
        <button className="create">+</button>
        <button className="remove">-</button>
        {classrooms.map((clasroom) => (
          <a>
            <div className="userListInfo">
              <div className="nombre">{clasroom.name}</div>
              <input type="checkbox" onClick={() => selectClassroom(clasroom)} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ListClassrooms;
