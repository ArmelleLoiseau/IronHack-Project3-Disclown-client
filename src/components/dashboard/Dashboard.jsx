import React, { useContext, useState, useEffect } from "react";
import useAuth from "../../context/useAuth";
// import components

//import css
import "./dashboard-css/dashboard.css";

import UsersList from "./UsersList";
import Chat from "./Chat";
import CreateChan from "./CreateChan";
import ChanList from "./ChanList";
import Profil from "./Profil";

// import contexts
import { SocketContext } from "../../context/socket.context";

const Dashboard = () => {
  const { currentUser, authenticateUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [chans, setChans] = useState([]);

  const connectWithSocket = useContext(SocketContext);

  // establish socket connection

  useEffect(() => {
    const userToken = localStorage.getItem("authToken");
    if (!userToken) {
      //log out and redirect to "/"
    } else {
      authenticateUser();
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
      <div className="dashboard">
        <div className="userList">
          <UsersList users={users} />
        </div>
        <div className="creatChan">
          <CreateChan addChan={addChan} />
        </div>
        <div className="chanList">
          <ChanList setChans={setChans} chans={chans} />
        </div>
        <div className="chat">
          <Chat />
        </div>
      </div>
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
