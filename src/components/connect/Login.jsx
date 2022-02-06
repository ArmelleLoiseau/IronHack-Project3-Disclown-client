import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";

// contexts

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // send login info to DB to log the user in
      const loggedInUser = await axios.post(
        "http://localhost:4000/login",
        user
      );

      // save user's email in  socket.auth
      let email = user.email;
      socket.auth = { email };
      console.log(email);

      // connect to socket
      socket.connect();

      // redirect user to dashboard
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
