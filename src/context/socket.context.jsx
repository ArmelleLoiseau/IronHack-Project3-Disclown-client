import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import useAuth from "./useAuth";

const SocketContext = React.createContext();

function SocketProviderWrapper(props) {
  const { currentUser, isLoggedIn } = useAuth();

  // users' states
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [newUser, setNewUser] = useState(null);
  const [userUpdated, setUserUpdated] = useState(false);

  // chans' states
  const [newChan, setNewChan] = useState({});
  const [chans, setChans] = useState([]);
  const [joinChan, setJoinChan] = useState(null);

  const addChan = (addedChan) => {
    setChans([...chans, addedChan]);
  };

  //messages' states
  const [prevMess, setPrevMess] = useState([]);
  const [message, setMessage] = useState(null);
  const [welcomeMess, setWelcomeMess]=useState("")

  const token = localStorage.getItem("authToken");

  const clientSocket = useRef();

  useEffect(() => {
    if (!isLoggedIn) return;
    const socket = io(import.meta.env.VITE_APP_BACKEND_URL, {
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

    // **** TO DO : finish this logic ***
    socket.on("user connected", (user) => {
      console.log("connected user", user);
      setNewUser(user);
    });

    // get all users from the back and ad "self"key to current user
    socket.on("users", (users) => {
      users.map((user) => {
        user.self = user._id === socket.auth.id;
      });
      // sort all users so that current user appear on top and they are sorted alphabetically
      users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });

      // update the list of connected users
      setConnectedUsers((prevValue) => users);
    });

    //handleChans
    if (joinChan !== null) {
      socket.emit("chan-join", joinChan);
    }
    //if (message !== null) 
   // socket.emit("send-message", message);

    // socket.on("receive-message", (data) => {
    //   setPrevMess({ ...prevMess, data });
    // });
    

    socket.on("user joined", (mess) => {
      setWelcomeMess(mess);
    });

    // **** TO DO : finish this logic ***
    socket.emit("user update", userUpdated);

    

    socket.on("disconnect", () => {
      console.log("user just disconnected");
      // socket.emit("disconnected", socket.auth.id);
    });

    socket.on("user disconnected", () => {
      console.log("disconnected user is", socket.id);
    });

    clientSocket.current = socket;

    // clean up the effect
    return () => {
      socket.disconnect();
      clientSocket.current = null;
    };
  }, [isLoggedIn, joinChan, message]);

  const socketValues = {
    socket: clientSocket.current,
    connectedUsers: connectedUsers,
    userUpdated,
    setUserUpdated,
    setNewChan,
    chans,
    setChans,
    addChan,
    joinChan,
    setJoinChan,
    prevMess,
    message,
    setMessage,
  };

  return (
    <SocketContext.Provider value={socketValues}>
      {props.children}
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProviderWrapper };
