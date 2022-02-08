import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import axios from "axios";

const API_URL = "http://localhost:4001";

const AuthContext = React.createContext();

function AuthProviderWrapper({ children }) {
  const [auth, setAuth] = useState({
    currentUser: null,
    isLoading: true,
    isLoggedIn: false,
  });

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((user) => {
          setAuth({ currentUser: user, isLoading: false, isLoggedIn: true });
        })
        .catch((e) => {
          setAuth({ currentUser: null, isLoading: false, isLoggedIn: false });
        });
    } else {
      setAuth({ currentUser: null, isLoading: false, isLoggedIn: false });
    }
  };

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  const logOutUser = () => {
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    authenticateUser();
  };

  const Authvalues = {
    currentUser: auth.currentUser,
    isLoading: auth.isLoading,
    isLoggedIn: auth.isLoggedIn,
    storeToken,
    authenticateUser,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={Authvalues}>{children}</AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
