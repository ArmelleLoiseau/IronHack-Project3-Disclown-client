import React, { useContext } from "react";
import { useEffect, useState } from "react";
import apiHandler from "../../api/apiHandler";
import Chat from "./Chat";
import Userslist from "../dashboard/Userslist";
import { SocketContext } from "../../context/socket.context";

function Channel() {
  const [chan, setChan] = useState({});
  const {socket, joinChan} = useContext(SocketContext)

  // **** TO DO **** changer axios par apiHandler
  // useEffect(() => {
  //   apiHandler
  //     .get("/chan/" + joinChan)
  //     .then((dbResponse) => (dbResponse.data))
  //     .catch((e) => console.log(e));
  // }, []);

  return (
    <div>
      <h2>{chan.name}</h2>
      <img src={chan.image} alt={chan.name} />
      <Userslist />
      <Chat />
    </div>
  );
}

export default Channel;
