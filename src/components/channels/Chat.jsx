import React, { useState, useEffect, useContext } from "react";
import apiHandler from "../../api/apiHandler";
import { SocketContext } from "../../context/socket.context";
import useAuth from "../../context/useAuth";

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const { joinChan, socket, welcomeMess } = useContext(SocketContext);
  const { currentUser } = useAuth();
  const [refresh, setRefresh] = useState(false);

  const getMessages = () => {
    console.log(joinChan);
    apiHandler
      .get(`/chan/${joinChan}/messages`)
      .then((dbResponse) => {
        setSentMessages(dbResponse.data);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getMessages();
    // socket.emit("chan-join", joinChan);
    socket.on("receive-message", () => {
      getMessages();
      setRefresh(!refresh);
    });
  }, [refresh]);

  const send = (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      socket.emit("send-message", {
        content: currentMessage,
        author: currentUser._id,
        chan: joinChan,
      });
      setCurrentMessage("");
    }
  };

  return (
    <div>
      <div className="sentMessages">
        <h2>chat</h2>
        {sentMessages.map((mesg) => {
          return (
            <div key={mesg._id}>
              <p>{mesg.content}</p>
              <p>Sent by {mesg.author.username}</p>
            </div>
          );
        })}
      </div>
      <p>{welcomeMess}</p>
      <div className="sendMessage">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={send}>Submit</button>
      </div>
    </div>
  );
};

export default Chat;
