import React, { useState, useContext, useEffect } from "react";

// Contexts
// import { UserContext } from "../../context/user.context";
import { SocketContext } from "../../context/socket.context";

const UsersList = () => {
  // const [usersConnected, setUsersConnected] = useState([]);

  const { connectedUsers, userUpdated } = useContext(SocketContext);

  useEffect(() => {
    console.log("is user updated ?", userUpdated);
  }, [connectedUsers, userUpdated]);

  console.log("Component{UsersList} => connectedUsers", connectedUsers);
  // if (!connectedUsers) return <p>loading...</p>;
  return (
    <div>
      <p> users list</p>
      {connectedUsers.map((user) => {
        return user.self ? (
          <div key={user._id}>
            <p>{user.username}(yourself)</p>
          </div>
        ) : (
          <div key={user._id}>
            <p>{user.username}</p>
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
