import React from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

function UseWebSocket(consumer, topic = "/topic/message") {
  const socket = new SockJS("http://localhost:8080/ws-message");
  const client = Stomp.over(socket);
  client.connect({}, () => {
    console.log("Connected: ");
    client.subscribe(topic, function (message) {
      consumer(message);
    });
  });
}

export default UseWebSocket;
