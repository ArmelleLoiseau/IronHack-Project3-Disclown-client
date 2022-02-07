import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import socket from "../socket";

const SocketContext = React.createContext();

function SocketProviderWrapper(props) {
  const ConnectWithSocket = (user, userToken) => {
    const jwtToken = userToken;
    socket.auth = {
      email: user?.email,
      token: jwtToken,
    };

    socket.on("connection", () => {
      console.log("succesfully connected with socket.io server");
      console.log(socket);
    });

    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
        // initReactiveProperties(user);
      });

      users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.email < b.email) return -1;
        return a.email > b.email ? 1 : 0;
      });

      socket.on("user connected", (user) => {
        // initReactiveProperties(user);
        users.push(user);
      });

      setUsers(users);
      console.log("--->", users);
    });
  };

  return (
    <SocketContext.Provider value={ConnectWithSocket}>
      {props.children}
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProviderWrapper };
