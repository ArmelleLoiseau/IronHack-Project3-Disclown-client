import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";

// import { AuthContext } from "../../context/Auth.context";

import socket from "../../socket";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/login", user);
      console.log("OK");
      let email = user.email;
      socket.auth = { email };
      console.log(email);
      socket.connect();
      navigate("/dashboard");
    } catch (err) {
      socket.on("connect_error", (err) => {
        if (err.message === "invalid username") {
          email = false;
        }
      });

      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="password">password</label>
        <input
          type="text"
          name="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
