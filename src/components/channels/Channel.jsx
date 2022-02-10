import React, { useContext, useEffect, useState } from "react";
import Chat from "./Chat";
import { Link } from "react-router-dom";
import Userslist from "../dashboard/Userslist";
import { SocketContext } from "../../context/socket.context";
import apiHandler from "../../api/apiHandler";
import "./chat.css";

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
    <div className="channel-global-container">
      <div className="chan-head">
        <div className="chan-head-img">
          <img src={currentChan.image} alt={currentChan.name} />
        </div>
        <h2> {currentChan.name}</h2>
        <Link to={"/dashboard"} className="chan-head-leave-link">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </Link>
      </div>
      <div className="channel-main">
        <Userslist />
        <Chat />
      </div>
    </div>
  );
}

export default Channel;
