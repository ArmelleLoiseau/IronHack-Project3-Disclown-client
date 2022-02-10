import React, { useState, useContext, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import { Link, useNavigate } from "react-router-dom";
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
      const dbResponse = await apiHandler.post("/login", user);

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
    <div className="formConnect">
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="email">
          Email
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
          Password
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
      <div className="formConnect-msg">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Link to={"/"}>
          <span className="formConnect-msg"> Not a member yet ? Sign-up !</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
