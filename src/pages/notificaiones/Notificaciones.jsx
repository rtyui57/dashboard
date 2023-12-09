import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

function Notificaciones() {
  const { username } = useAuth();
  return (
    <div className="flex flex-col">
      Notificaiones
    
      <button
        onClick={() => {
          toast.error("Hola", {
            position: "bottom-right",
            autoClose: 3000,
          });
        }}
      >
        Hola   {username}
      </button>
    </div>
  );
}

export default Notificaciones;
