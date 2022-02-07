import React, { useContext, useState, useEffect } from "react";
import socket from "../../socket";
import ConnectWithSocket from "../../socketConnection/ConnectWithSocket";

// import components
import UsersList from "./UsersList";
import Chat from "./Chat";
import CreateChan from "./CreateChan";
import ChanList from "./ChanList";

// import contexts
import { AuthContext } from "../../context/Auth.context";
import { SocketContext } from "../../context/socket.context";

const Dashboard = () => {
  const { user, authenticateUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [chans, setChans] = useState([]);

  const { ConnectWithSocket } = useContext(SocketContext);
  // establish socket connection

  useEffect(() => {
    const userToken = localStorage.getItem("authToken");
    if (!userToken) {
      //log out and redirect to "/"
    } else {
      authenticateUser();
      ConnectWithSocket(user, userToken);
    }
  }, []);

  const addChan = (addedChan) => {
    setChans([...chans, addedChan]);
  };
  // const initReactiveProperties = (user) => {
  //   user.hasNewMessages = false;
  // };

  // socket.on("users", (users) => {
  //   users.forEach((user) => {
  //     user.self = user.userID === socket.id;
  //     // initReactiveProperties(user);
  //   });
  //   users = users.sort((a, b) => {
  //     if (a.self) return -1;
  //     if (b.self) return 1;
  //     if (a.userEmail < b.userEmail) return -1;
  //     return a.userEmail > b.userEmail ? 1 : 0;
  //   });

  //   socket.on("user connected", (user) => {
  //     // initReactiveProperties(user);
  //     users.push(user);
  //   });

  //   setUsers(users);
  //   console.log("--->", users);
  // });

  if (!users) return <p> loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <UsersList users={users} />
      <CreateChan addChan={addChan} />
      <ChanList setChans={setChans} chans={chans} />
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
