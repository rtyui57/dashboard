import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import WebSocketComponent from "../../websocket/WebSocketComponent";

function Notificaciones() {
  const { username } = useAuth();
  return (
    <div className="flex flex-col content-center">
      <h1>NOtificaiones</h1>
      <WebSocketComponent/>
    </div>
  );
}

export default Notificaciones;
