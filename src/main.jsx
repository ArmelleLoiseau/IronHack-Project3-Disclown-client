import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { SocketProviderWrapper } from "./context/socket.context";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketProviderWrapper>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </SocketProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
