import React, { useState, useEffect, useContext } from "react";

// A CHANGER
import io from "socket.io-client";
import { SocketContext } from "../../context/socket.context";
import { AuthContext } from "../../context/auth.context";

const socket = io.connect("http://localhost:3000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);

  const send = async (e) => {
    e.preventDefault();
    if (message !== "") {
      await io.emit("send-message", message);
      setSentMessages({ ...sentMessages, message });
    }
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setSentMessages({ ...sentMessages, data });
    });
  }, [socket]);

  return (
    <div>
      <div className="sentMessages">
        <h2>chat</h2>
        {sentMessages.map((message) => {
          return <p>{message}</p>;
        })}
      </div>
      <div className="sendMessage">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={send}>Submit</button>
      </div>
    </div>
  );
};

export default Chat;
