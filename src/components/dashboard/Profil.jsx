import React, { useState, useContext } from "react";
import { UserContext } from "../../context/user.context";

const Profil = () => {
  const [usersConnected, setUsersConnected] = useState([]);
  const { users } = useContext(UserContext);

  if (!usersConnected) return <p>loading...</p>;
  console.log("Profil==========>", users);
  return (
    <div>
      <h1>Profil</h1>
      {users.map((user) => {
        return user.self ? <p>{user.userEmail}</p> : "";
      })}
    </div>
  );
};

export default Profil;
