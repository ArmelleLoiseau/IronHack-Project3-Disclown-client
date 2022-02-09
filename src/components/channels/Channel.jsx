import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Chat from "./Chat";
import Userslist from "./Userslist";

function Channel({ chanId }) {
  const [chan, setChan] = useState({});

  // **** TO DO **** changer axios par apiHandler
  useEffect(() => {
    socket.emit("room-join", chanId);
    axios
      .get("http://localhost:4000/chan" + chanId)
      .then((dbResponse) => setChan(dbResponse.data))
      .catch((e) => console.log(e));
  }, []);

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
