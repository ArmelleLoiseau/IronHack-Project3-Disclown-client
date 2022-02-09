import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import useAuth from "./useAuth";

const SocketContext = React.createContext();

function SocketProviderWrapper(props) {
  const { currentUser, isLoggedIn } = useAuth();

  const [connectedUsers, setConnectedUsers] = useState([]);
  const [newUser, setNewUser] = useState(null);

  const token = localStorage.getItem("authToken");
  // const [socket, setSocket] = useState(io("http://localhost:4001"));
  const clientSocket = useRef();
  useEffect(() => {
    if (!isLoggedIn) return;
    const socket = io(import.meta.env.VITE_APP_BACKEND_URL, {
      // autoConnect: false,
      withCredentials: true,
    });

    socket.on("connected", () => {
      console.log("CurrentUser", currentUser);
      console.log("socket", socket);
      console.log("succesfully connected with socket.io server");
    });

    //  ConnectWithSocket
    socket.auth = {
      email: currentUser?.email,
      id: currentUser?._id,
      token: token,
    };

    socket.on("user connected", (user) => {
      console.log("connected user", user);
      setNewUser(user);
    });

    socket.on("users", (users) => {
      users.map((user) => {
        user.self = user._id === socket.auth.id;
      });

      users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.email < b.email) return -1;
        return a.email > b.email ? 1 : 0;
      });

      setConnectedUsers((prevValue) => users);
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

    socket.on("disconnect", () => {
      console.log("user just disconnected");
      // socket.emit("disconnected", socket.auth.id);
    });

    socket.on("user disconnected", () => {
      console.log("disconnected user is", socket.id);
    });
    clientSocket.current = socket;

    return () => {
      socket.disconnect();
      clientSocket.current = null;
    };

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
