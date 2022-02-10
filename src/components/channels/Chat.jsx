import React, { useState, useEffect, useContext } from "react";
import apiHandler from "../../api/apiHandler";
import { SocketContext } from "../../context/socket.context";
import useAuth from "../../context/useAuth";
import ScrollToBottom from "react-scroll-to-bottom";
import "./chat.css";

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const { joinChan, socket, welcomeMess } = useContext(SocketContext);
  const { currentUser } = useAuth();

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

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
  }, []);

  const send = (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      socket.emit("send-message", {
        content: currentMessage,
        author: currentUser._id,
        chan: joinChan,
      });
      setCurrentMessage("");
      getMessages();
    }
  };

  socket.on("receive-message", (data) => {
    console.log("message received", data);
    getMessages();
  });

  return (
    <div className="chat-container">
      <ScrollToBottom>
        <div className="sentMessages">
          <h2 className="sentMessages-title">chat</h2>
          {sentMessages.map((mesg) => {
            return (
              <div className="sentMessages-text" key={mesg._id}>
                <img src={mesg.author.avatar} alt={mesg.author.username} />
                <p className="sentMessages-content">{mesg.content}</p>
                <p className="sentMessages-author">
                  Sent by {mesg.author.username}
                </p>
              </div>
            );
          })}
        </div>
      </ScrollToBottom>
      <p>{welcomeMess}</p>
      <div className="sendMessage">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") send(e);
          }}
        />
        <i class="fa-solid fa-paper-plane-top" onClick={send} Submit></i>
        <button onClick={send}>Submit</button>
      </div>
    </div>
  );
};

export default Chat;
