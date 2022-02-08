import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import useAuth from "./useAuth";

const SocketContext = React.createContext();

function SocketProviderWrapper(props) {
  const { currentUser, isLoggedIn } = useAuth();

  const [connectedUsers, setConnectedUsers] = useState([]);

  const token = localStorage.getItem("authToken");
  // const [socket, setSocket] = useState(io("http://localhost:4001"));
  const clientSocket = useRef();
  useEffect(() => {
    if (!isLoggedIn) return;
    console.log("connection au socket");
    const socket = io("http://localhost:4001", {
      // autoConnect: false,
      withCredentials: true,
    });

    socket.on("connected", () => {
      console.log("CurrentUser loooooooooooooooog", currentUser);
      console.log("socekt", socket);
      console.log("succesfully connected with socket.io server");
    });

    //  ConnectWithSocket
    socket.auth = {
      email: currentUser?.data.email,
      id: currentUser?.data._id,
      token: token,
    };

    socket.on("user connected", (user) => {
      console.log("connected user", user);
    });

    socket.on("users", (users) => {
      users.map((user) => {
        user.self = user._id === socket.auth.id;
      });

      setConnectedUsers((prevValue) => users);
      console.log("Users", users);
      //   users.forEach((user) => {
      //   user.self = user.userID === socket.auth.id;
    });

    // socket.on("users", (users) => {
    //   // setConnectedUsers(users);
    //   console.log("log users", users);
    //   // initReactiveProperties(user);
    // });

    //   users = users.sort((a, b) => {
    //     if (a.self) return -1;
    //     if (b.self) return 1;
    //     if (a.email < b.email) return -1;
    //     return a.email > b.email ? 1 : 0;
    //   });

    // socket.on("user connected", (user) => {
    // initReactiveProperties(user);
    // setConnectedUsers([...connectedUsers, user]);
    // console.log("Connected users", connectedUsers);
    // });

    // setUsers(users);
    // console.log("--->", users);

    // }();
    clientSocket.current = socket;
    // clean up the effect
  }, [isLoggedIn]);

  const socketValues = {
    socket: clientSocket.current,
    connectedUsers: connectedUsers,
  };

  return (
    <SocketContext.Provider value={socketValues}>
      {props.children}
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProviderWrapper };
