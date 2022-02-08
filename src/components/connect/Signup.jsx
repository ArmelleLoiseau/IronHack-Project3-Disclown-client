import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "./../../context/auth.context";

const Signup = () => {
  // get user from Auth Context
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { authenticateUser, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    authenticateUser();
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // send the sign-up info to DB to create new user
      const newUser = await axios.post("http://localhost:4001/signup", user);
      console.log("SIGN-UP -- new user is :", newUser.data.user);

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

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Link to={"/login"}> Already have an account ? Click here to login</Link>
    </div>
  );
};

export default Signup;
