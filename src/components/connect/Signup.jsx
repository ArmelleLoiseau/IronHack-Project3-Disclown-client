import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./form.css";

import { AuthContext } from "./../../context/auth.context";

const Signup = () => {
  // get user from Auth Context
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState();
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { authenticateUser, isLoggedIn } = useContext(AuthContext);

  const avatarRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    authenticateUser();
    if (isLoggedIn) navigate("/dashboard");
  }, [isLoggedIn]);

  const handleAvatar = (input) => {
    axios
      .get(`https://avatars.dicebear.com/api/bottts/${input}.svg`)
      .then(({ data }) => {
        // console.log(data);
        avatarRef.current = data;
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_APP_BACKEND_URL + "/signup", user);
      navigate("/login");
    } catch (err) {
      setErrorMessage((prevValue) => err.response.data.message);
      console.error(err);
    }
  };

  return (
    <div>
      {/* if user already has token, navigate to dashboard */}
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="username">
          username
        </label>
        <input
          className="form-input"
          placeholder="Enter your Username"
          type="text"
          name="username"
          value={user.username}
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
            handleAvatar(e.target.value);
          }}
        />
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
        <div>
          <p>This will be your profile pic</p>
          {avatarRef.current}
        </div>
        <button>Sign up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Link to={"/login"}> Already have an account ? Click here to login</Link>
    </div>
  );
};

export default Signup;
