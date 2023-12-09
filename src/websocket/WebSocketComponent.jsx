import React, { useEffect, useState } from "react";
import SockJsClient from "react-stomp";

const SOCKET_URL = "http://localhost:8080/ws-message";

export default function WebSocketComponent() {
  const [messages, setMessages] = useState([]);

  let onConnected = () => {
    console.log("Connected!!");
  };

  let onMessageReceived = (msg) => {
    console.log(messages);
    setMessages((prevMessages) => [...prevMessages, msg.message]);
  };

  return (
    <div className="content-center">
      <SockJsClient
        url={SOCKET_URL}
        topics={["/topic/message"]}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
      />
      <div className="flex flex-col w-full text-center content-center h-full overflow-y-auto">
        <div className="ml-32">
          {messages.map((m) => (
            <div className="w-64 m-2 p-3 border-2 border-blue-700 rounded-md flex flex-col">
              {m}
              <div className="w-full">
                <button className="flex bg-blue-500 p-2 rounded-sm  content-end">
                  Access
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
