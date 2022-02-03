import React, { useState } from "react";
// import APIHandler from "../api/APIHandler";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "test@test.fr",
    password: "1234",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/login", user);
      console.log("OK");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} onChange={setUser}>
        <label htmlFor="email">email</label>
        <input type="text" name="email" defaultValue={user.email} />
        <label htmlFor="password">password</label>
        <input type="text" name="password" defaultValue={user.password} />
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
