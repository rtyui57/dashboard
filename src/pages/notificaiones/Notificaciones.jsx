import React, { Component } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

class Notificaciones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    const socket = new SockJS("http://localhost:8080/ws-message");
    this.client = Stomp.over(socket);
    this.client.connect({}, () => {
      console.log("Connected: ");
      this.client.subscribe("/topic/message", (message) => { // Utiliza una función de flecha aquí
        message = JSON.parse(message.body);
        this.setState((prevState) => ({
          messages: [...prevState.messages, message.message ], // Agrega message.body al estado messages
        }));
      });
    });
  }

  componentWillUnmount() {
    this.client.disconnect();
  }

  render() {
    const { messages } = this.state;
    return (
      <div>
        <h2>WebSocket Meages:</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Notificaciones;
