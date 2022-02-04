import React, { useState } from "react";
import socket from "../../socket";

const UsersList = ({ users }) => {
  const [usersConnected, setUsersConnected] = useState([]);

  if (!usersConnected) return <p>loading...</p>;

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
