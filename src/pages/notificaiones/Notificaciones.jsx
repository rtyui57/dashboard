import { ToastContainer, toast } from "react-toastify";

function Notificaciones() {
  return (
    <div>
      Notificaiones
      <button
        onClick={() => {
          toast.error("Hola", {
            position: "bottom-right",
            autoClose: 3000,
          });
        }}
      >
        Hola
      </button>
    </div>
  );
}

export default Notificaciones;
