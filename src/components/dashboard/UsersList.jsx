import React, { useState, useContext } from "react";
import socket from "../../socket";

// Contexts
import { UserContext } from "../../context/user.context";

const UsersList = () => {
  const [usersConnected, setUsersConnected] = useState([]);
  const { users } = useContext(UserContext);

  if (!usersConnected) return <p>loading...</p>;
  console.log(users);
  return (
    <div>
      <p> users list</p>
      {users.map((user) => {
        return user.self ? (
          <div key={user.userID}>
            <p>{user.userEmail}(yourself)</p>
          </div>
        ) : (
          <div key={user.userID}>
            <p>{user.userEmail}</p>
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
