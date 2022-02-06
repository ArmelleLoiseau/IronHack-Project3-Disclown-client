import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChanContextWrapper } from "./context/chan.context";
import { UserContextWrapper } from "./context/user.context";
import { AuthProviderWrapper } from "./context/auth.context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChanContextWrapper>
        <UserContextWrapper>
          <AuthProviderWrapper>
            <App />
          </AuthProviderWrapper>
        </UserContextWrapper>
      </ChanContextWrapper>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
