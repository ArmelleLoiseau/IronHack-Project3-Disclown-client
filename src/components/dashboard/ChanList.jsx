import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./dashboard-css/chanList.css";

// contexts
import { ChanContext } from "../../context/chan.context";

const ChanList = () => {
  const { chans, setChans } = useContext(ChanContext);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BACKEND_URL + "/chan", chans)
      .then((dbResponse) => setChans(dbResponse.data))
      .catch((e) => console.error(e));
  }, []);

  if (!chans) return <p>loading...</p>;
  return (
    <>
      <div className="chanList-content">
        <div className="chanList-header">
          <h2>Chan List global</h2>
          <div className="searchChan">
            {/* <input
              type="text"
              placeholder="Looking for a spécific chan"
              onChange={e}
            /> */}
          </div>
        </div>
        {chans.map((chan) => {
          return (
            <Link to={`/chan/${chan._id}`} key={chan._id}>
              <div className="chanList-chan">
                <img
                  className="chanList-image"
                  src={chan.image}
                  alt={chan.name}
                />
                <p>{chan.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ChanList;
