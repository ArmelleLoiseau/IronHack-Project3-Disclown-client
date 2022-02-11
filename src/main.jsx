import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { SocketProviderWrapper } from "./context/socket.context";
import { UserContextWrapper } from "./context/user.context";
// import { videoContextWrapper } from "./context/video.context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProviderWrapper>
        <SocketProviderWrapper>
          <UserContextWrapper>
            {/* <videoContextWrapper> */}
            <App />
            {/* </videoContextWrapper> */}
          </UserContextWrapper>
        </SocketProviderWrapper>
      </AuthProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
