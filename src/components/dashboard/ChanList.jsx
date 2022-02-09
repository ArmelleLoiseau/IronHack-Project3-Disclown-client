import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./dashboard-css/chanList.css";

// contexts
import { ChanContext } from "../../context/chan.context";
// import SearchChan from "./SearchChan";

const ChanList = () => {
  const { chans, setChans } = useContext(ChanContext);
  // const { searChan, setSearChan } = useContext(ChanContext);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BACKEND_URL + "/chan", chans)
      .then((dbResponse) => setChans(dbResponse.data))
      .catch((e) => console.error(e));
  }, []);

  // let search = null;
  // if (searChan !== "") {
  //   sear = chans.filter((chan) => {
  //     return chan.name.tolowerCase().includes(searChan.tolowerCase());
  //   });
  // } else {
  //   search = chans;
  // }

  if (!chans) return <p>loading...</p>;
  return (
    <>
      <div className="chanList-content">
        <div className="chanList-header">
          <h2>Chan List global</h2>
          <div className="searchChan">{/* <SearchChan /> */}</div>
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
