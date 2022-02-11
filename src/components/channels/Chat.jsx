import React, { useState, useEffect, useContext } from "react";
import apiHandler from "../../api/apiHandler";
import { SocketContext } from "../../context/socket.context";
import useAuth from "../../context/useAuth";
import ScrollToBottom from "react-scroll-to-bottom";
import EdiText from "react-editext";
import "./chat.css";

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const { joinChan, socket, welcomeMess } = useContext(SocketContext);
  const { currentUser } = useAuth();
  // const [isAuthor, setIsAuthor] = useState([]);

  // const [chosenEmoji, setChosenEmoji] = useState(null);
  // const onEmojiClick = (event, emojiObject) => {
  //   setChosenEmoji(emojiObject);
  // };

  const [value, setValue] = useState("");

  const getMessages = () => {
    apiHandler
      .get(`/chan/${joinChan}/messages`)
      .then((dbResponse) => {
        setSentMessages(dbResponse.data);
      })
      .catch((e) => console.error(e));

    // if (sentMessages) {
    //   setIsAuthor(
    //     sentMessages.filter((msg) => msg.author._id === currentUser._id)
    //   );
    // }

    // console.log(isAuthor);
  };

  useEffect(() => {
    getMessages();
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
          <h2 className="sentMessages-title">🐈 Chat 🐈</h2>
          {sentMessages.map((mesg) => {
            return (
              <div
                className={`sentMessages-text ${
                  mesg.author._id === currentUser._id ? "author" : "not-author"
                }`}
                key={mesg._id}
              >
                <div className="sentMessages-header">
                  <img src={mesg.author.avatar} alt={mesg.author.username} />
                  <p className="sentMessages-author">
                    {`${
                      mesg.author._id === currentUser._id
                        ? "Sent by you"
                        : `Sent by ${mesg.author.username}`
                    }`}
                  </p>
                </div>
                <div className="sentMessages-main-card">
                  <p id={mesg._id} className="sentMessages-content">
                    {mesg.content}
                  </p>
                  <div
                    className={`sentMessages-text ${
                      mesg.author._id === currentUser._id
                        ? "edit-visible"
                        : "edit-not-visible"
                    }`}
                  >
                    <EdiText
                      type="text"
                      value={value}
                      onSave={async (val) => {
                        const elem = document.getElementById(mesg._id);
                        elem.remove();
                        setCurrentMessage(val);
                        await apiHandler.patch(
                          `/chan/messages/${mesg._id}`,
                          val
                        );
                      }}
                    />
                  </div>
                </div>
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
          placeholder="Write something witty here"
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") send(e);
          }}
        />

        <div className="send-icon">
          <i class="fa-solid fa-paper-plane" onClick={send} Submit></i>
        </div>
        {/* <button onClick={send}>
        </button> */}
      </div>
    </div>
  );
};

export default Chat;
