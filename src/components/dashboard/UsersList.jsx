import React, { useState, useContext, useEffect } from "react";
import "./../channels/chat.css";

// Contexts
import { SocketContext } from "../../context/socket.context";

const UsersList = () => {
  const { connectedUsers, userUpdated } = useContext(SocketContext);

  useEffect(() => {
    console.log("is user updated ?", userUpdated);
  }, [connectedUsers, userUpdated]);

  console.log("Component{UsersList} => connectedUsers", connectedUsers);
  // if (!connectedUsers) return <p>loading...</p>;
  return (
    <div className="users-list">
      <p> Who is around ?</p>
      {/* {!connectedUsers.length && (
        <p>
          Uh oh, it seems everyone has better things to do... Sorry mate. You
          can still chat with yourself, if you fancy.
        </p>
      )} */}
      {connectedUsers.map((user) => {
        return user.self ? (
          <div className="user" key={user._id}>
            <span className="user-p">&#128994; You (obviously) 🦁</span>
          </div>
        ) : (
          <div className="user" key={user._id}>
            <span className="user-p">
              &#128994;
              {user.username}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
