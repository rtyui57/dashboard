import React from "react";
import { useNotifications } from "../../context/NotificationsContext";
import "./notificaciones.scss";

export default function Notificaciones() {
  const { getMessages, clearMessages } = useNotifications();
    console.log(getMessages());
  return (
    <div className="notifications-container">
      <h1>Lista de Notificaciones</h1>
      <button onClick={() => clearMessages()} className="clean-notifications">
        Marcar todas como leidas
      </button>
      <ul>
        {getMessages().map((message, index) => (
          <div className="notification">
            <div className="noti-info">
              <h1 className="title">{message.titulo}</h1>
              <p className="fecha">{message.date}</p>
            </div>
            <div className="cluster">
              <button className="lnkbutton">Acceder</button>
              <button className="lnkbutton">Marcar como leida</button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
