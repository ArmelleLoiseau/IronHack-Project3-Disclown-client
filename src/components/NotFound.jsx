import React, { useNavigate } from "react";
import { Link } from "react-router-dom";
import "./notFoucnd.css";

const NotFound = () => {
  return (
    <div className="notFound">
      <p>Sorry, it seems you're looking for something that doesn't exist...</p>
      <Link to="/">
        <div className="notFound-link">
          <img
            src="https://c.tenor.com/EMh3ky3GEo0AAAAC/bebe-running.gif"
            alt=""
          />
          <span>🎵 Take me home, to the place I belong 🎵</span>
        </div>
      </Link>
    </div>
  );
};

export default NotFound;
