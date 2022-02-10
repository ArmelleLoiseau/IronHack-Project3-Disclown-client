import React, { useContext, useState, useEffect } from "react";
import useAuth from "../../context/useAuth";
// import components

//import css
import "./dashboard-css/dashboard.css";

// import UsersList from "./UsersList";
import CreateChan from "./CreateChan";
import ChanList from "./ChanList";
import Profil from "./Profil";

// import contexts
import { SocketContext } from "../../context/socket.context";

const Dashboard = () => {
  const { currentUser, authenticateUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [chans, setChans] = useState([]);
  const [chanId, setChanId] = useState(null);

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
  const currentChan = chans.find((c) => c._id === chanId);

  if (!users) return <p> loading...</p>;

  return (
    <div>
      <div className="dashboard">
        <div className="profil">
          <Profil />
        </div>
        <div className="creatChan">
          <CreateChan addChan={addChan} />
        </div>
        <div className="chanList">
          <ChanList setChans={setChans} chans={chans} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
