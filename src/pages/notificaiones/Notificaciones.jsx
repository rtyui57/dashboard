import React from "react";
import { useNotifications } from "../../context/NotificationsContext";
import { Link } from "react-router-dom";
import "./notificaciones.scss";

export default function Notificaciones() {
  const { getMessages, clearMessages, markAsRead } = useNotifications();
  const formatDate = (date) => {
    return date.slice(0, 16).replace("T", " ").replaceAll("-", "/");
  };
  console.log(getMessages());

  return (
    <div className="notifications-container">
      <h1>Lista de Notificaciones</h1>
      {getMessages().length !== 0 && (
        <button onClick={() => clearMessages()} className="clean-notifications">
          Marcar todas como leidas
        </button>
      )}
      <ul>
        {getMessages().map((message, index) => (
          <div className="notification">
            <div className="noti-info">
              <h1 className="title">{message.titulo}</h1>
              <p className="fecha">{formatDate(message.date)}</p>
            </div>
            <div className="cluster">
              <Link to={`/event/${message.eventId}`}>
                <button className="lnkbutton" onClick={() => markAsRead(message)}>Acceder</button>
              </Link>

              <button className="lnkbutton" onClick={() => markAsRead(message)}>
                Marcar como leida
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
