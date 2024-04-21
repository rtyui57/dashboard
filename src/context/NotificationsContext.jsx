import { func } from "prop-types";
import React, { createContext, useContext, useState } from "react";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);


    function addMessage(msg) {
        setMessages((prevMessages) => [...prevMessages, msg]);
    }

    function getMessages() {
        return messages;
    }

    function clearMessages() {
        setMessages([]);
    }

    function markAsRead(message) {
        setMessages((prevMessages) => {
            prevMessages.filter((msg) => msg !== message);
        });
    }

  return (
    <NotificationsContext.Provider value={{ addMessage, getMessages, clearMessages, markAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(NotificationsContext);
};
