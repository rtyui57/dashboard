import "./userDetails.scss";

const UserDetails = ({selectedUser}) => {
  console.log(selectedUser)
  return (
    <div className="userDetails">
      <h2>Formulario de Usuario</h2>
      {selectedUser ? (
        <form>
          <p>First Name: {selectedUser.id}</p>
          <p>Nombre: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
          {/* Agrega más campos del formulario según necesites */}
        </form>
      ) : (
        <p>Selecciona un usuario para ver sus detalles.</p>
      )}
    </div>
  );
};

export default UserDetails;
