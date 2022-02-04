import React, { useContext } from "react";
import socket from "../../socket";
// import { AuthContext } from "../../context/Auth.context";

const Dashboard = () => {
  // const { isLoggedIn, user } = useContext(AuthContext);

  const initReactiveProperties = (user) => {
    user.hasNewMessages = false;
  };

  socket.on("users", (users) => {
    users.forEach((user) => {
      console.log("HEYYYYY", user);
      user.self = user.userID === socket.id;
      initReactiveProperties(user);
    });
    users = users.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.userEmail < b.userEmail) return -1;
      return a.userEmail > b.userEmail ? 1 : 0;
    });
  });

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="sendMessage">
        <input type="text" />
        <button>Submit</button>
      </div>
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
