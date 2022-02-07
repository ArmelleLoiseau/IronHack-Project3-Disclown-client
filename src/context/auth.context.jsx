import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:4001";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoadding] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
