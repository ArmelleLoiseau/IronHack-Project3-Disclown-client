import React, { useState, useEffect } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);

  useEffect(() => {
    // socket.emit();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSentMessages({ ...sentMessages, message });
  };

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
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Chat;
