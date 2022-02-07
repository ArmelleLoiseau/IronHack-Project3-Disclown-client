import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChanContextWrapper } from "./context/chan.context";
import { AuthProviderWrapper } from "./context/auth.context";
import { SocketProviderWrapper } from "./context/socket.context";
import {UserContextWrapper} from "./context/user.context"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProviderWrapper>
        <SocketProviderWrapper>
          <ChanContextWrapper>
          <UserContextWrapper>
          <App />
          </UserContextWrapper>
          </ChanContextWrapper>
        </SocketProviderWrapper>
      </AuthProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
