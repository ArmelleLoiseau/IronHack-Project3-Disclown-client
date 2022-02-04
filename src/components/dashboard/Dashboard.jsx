import React, { useContext, useState } from "react";
import socket from "../../socket";
import UsersList from "./UsersList";
import Chat from "./Chat";
import CreateChan from "./CreateChan";
import ChanList from "./ChanList";
// import { AuthContext } from "../../context/Auth.context";

const Dashboard = () => {
  // const { isLoggedIn, user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  // const initReactiveProperties = (user) => {
  //   user.hasNewMessages = false;
  // };

  socket.on("users", (users) => {
    users.forEach((user) => {
      user.self = user.userID === socket.id;
      // initReactiveProperties(user);
    });
    users = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.userEmail < b.userEmail) return -1;
      return a.userEmail > b.userEmail ? 1 : 0;
    });

    socket.on("user connected", (user) => {
      // initReactiveProperties(user);
      users.push(user);
    });

    setUsers(users);
    console.log("--->", users);
  });

  if (!users) return <p> loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <UsersList users={users} />
      <CreateChan />
      <ChanList />
      <Chat />
      {/* {isLoggedIn && (
        <>
          <p>User LoggedIn</p>
        </>
      )}
      {!isLoggedIn && (
        <>
          <p>User !logged</p>
        </>
      )} */}
    </div>
  );
};

export default Dashboard;
