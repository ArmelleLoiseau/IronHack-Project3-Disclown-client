import React, { useContext, useState } from "react";
import socket from "../../socket";

// Components
import UsersList from "./UsersList";
import Chat from "./Chat";
import CreateChan from "./CreateChan";
import ChanList from "./ChanList";

// Contexts
import { UserContext } from "../../context/user.context";
// import { AuthContext } from "../../context/Auth.context";

const Dashboard = () => {
  // const { isLoggedIn, user } = useContext(AuthContext);
  // const [users, setUsers] = useState([]);

  // const initReactiveProperties = (user) => {
  //   user.hasNewMessages = false;
  // };

  // get all users from UserContext
  const { users, setUsers } = useContext(UserContext);

  socket.on("users", (users) => {
    // attach the "self" key to the current user
    users.forEach((user) => {
      user.self = user.userID === socket.id;
      // initReactiveProperties(user);
    });
    // sort the array of users to that user.self is first
    users = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.userEmail < b.userEmail) return -1;
      return a.userEmail > b.userEmail ? 1 : 0;
    });
    // push new user in the array of user
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
      <UsersList />
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
