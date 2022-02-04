import "./App.css";
import { io } from "socket.io-client";
import Signup from "./components/Signup";
import Login from "./components/Login";

const socket = io("http://localhost:4000", {
  withCredentials: true,
});

function App() {
  // socket.emit("connection", () => {
  //   console.log(`you connected with the id: ${socket.id}`);
  // });

  return (
    <div className="App">
      <h1> HELLO </h1>
      <Signup />

      <Login />
    </div>
  );
}

export default App;
