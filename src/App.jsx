import "./App.css";
// import { io } from "socket.io-client";
import Signup from "./components/connect/Signup";
import Login from "./components/connect/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
// import { AuthContext } from "./context/Auth.context";

// const socket = io("http://localhost:4001", {
//   autoConnect: false,
//   withCredentials: true,
// });

import socket from "./socket";

function App() {
  // socket.emit("connection", () => {
  //   console.log(`you connected with the id: ${socket.id}`);
  // });
  // const { isLoggedIn, isLoading } = useContext(AuthContext);

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  return (
    <div className="App">
      <h1> HELLO </h1>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
