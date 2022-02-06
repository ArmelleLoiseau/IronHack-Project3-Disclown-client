import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// contexts

const Signup = () => {
  // get user from Auth Context
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  if (!user) return <p>loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // send the sign-up info to DB to create new user
      const newUser = await axios.post("http://localhost:4000/signup", user);
      console.log("SIGN-UP -- new user is :", newUser.data.user);

      // redirect the user to login page
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {/* if user already has token, navigate to dashboard */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
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
        <button>Sign up</button>
      </form>
      <Link to={`/login`}>
        <p> Already registered ? Sign-in here</p>
      </Link>
    </div>
  );
};

export default Signup;
