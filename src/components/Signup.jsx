import axios from "axios";
import React, { useState } from "react";
// import APIHandler from '../api/APIHandler';
// import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    username: "test",
    email: "test@test.fr",
    password: "1234",
  });
  //   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/signup", user);
      console.log("OK");
      //   navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} onChange={setUser}>
        <label htmlFor="username">username</label>
        <input type="text" name="username" defaultValue={user.username} />
        <label htmlFor="email">email</label>
        <input type="text" name="email" defaultValue={user.email} />
        <label htmlFor="password">password</label>
        <input type="text" name="password" defaultValue={user.password} />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
