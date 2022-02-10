import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./form.css";

import { AuthContext } from "./../../context/auth.context";

// contexts

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser, isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  // redirect the user to the dashboard directly if he's already logged-in
  useEffect(() => {
    authenticateUser();
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dbResponse = await axios.post(
        import.meta.env.VITE_APP_BACKEND_URL + "/login",
        user
      );

      // set socket.auth to user.email and connect to socket
      // let email = user.email;
      // socket.auth = { email };
      // console.log(email);
      // socket.connect();

      // store the jwt token in local storage
      storeToken(dbResponse.data.authToken);

      //verify the token
      authenticateUser();

      // redirect to dashboard

      navigate("/dashboard");
    } catch (err) {
      const errorDescription = err.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="email">
          email
        </label>
        <input
          placeholder="Enter your Email"
          className="form-input"
          type="text"
          name="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label className="form-label" htmlFor="password">
          password
        </label>
        <input
          placeholder="Enter your password"
          className="form-input"
          type="text"
          name="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button>Log in</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Link to={"/"}>
        <span className="formConnect-msg"> Not a member yet ? Sign-up !</span>
      </Link>
    </div>
  );
};

export default Login;
