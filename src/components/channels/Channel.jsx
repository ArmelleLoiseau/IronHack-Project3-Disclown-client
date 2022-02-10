import React, { useContext, useEffect, useState } from "react";
import Chat from "./Chat";
import { Link } from "react-router-dom";
import Userslist from "../dashboard/Userslist";
import { SocketContext } from "../../context/socket.context";
import apiHandler from "../../api/apiHandler";

function Channel() {
  const [chan, setChan] = useState({});
  const { joinChan } = useContext(SocketContext);
  const [currentChan, setCurrentChan] = useState({});

  useEffect(() => {
    console.log(joinChan);
    apiHandler
      .get(`/chan/${joinChan}`)
      .then((dbResponse) => {
        setCurrentChan((prevValue) => dbResponse.data);
      })
      .catch((e) => console.error(e));
  }, []);

  if (!currentChan) return <p> loading...</p>;
  console.log(currentChan);
  return (
    <div className="channel-main">
      <h2> You are on {currentChan.name}</h2>
      <img
        src={currentChan.image}
        alt={currentChan.name}
        style={{ width: "100px", borderRadius: "50%" }}
      />
      <Link to={"/dashboard"}>Leave this chat</Link>
      <Userslist />
      <Chat />
    </div>
  );
}

export default Channel;
