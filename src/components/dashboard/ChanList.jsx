import React, { useState, useEffect, useContext } from "react";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import "./dashboard-css/list.css";

// contexts
import { SocketContext } from "../../context/socket.context";
import SearchChan from "./SearchChan";

const ChanList = () => {
  const { chans, setChans, setJoinChan, joinChan } = useContext(SocketContext);
  const [searchChan, setSearchChan] = useState("");

  if (!chans) return <p>loading...</p>;

  useEffect(() => {
    apiHandler
      .get("/chan")
      .then((dbResponse) => setChans(dbResponse.data))
      .catch((e) => console.error(e));
  }, []);

  let search = null;
  if (searchChan !== "") {
    search = chans.filter((chan) => {
      return chan.name.toLowerCase().includes(searchChan.toLowerCase());
    });
  } else {
    search = chans;
  }

  return (
    <>
      <div className="chanlist">
        <div className="chanList-header">
          <span>All channels</span>
          <div className="searChan">
            <SearchChan
              searchChan={searchChan}
              callbackSearch={setSearchChan}
            />
          </div>
        </div>
        <div className="chanList-content">
          {search.map((chan) => {
            return (
              <div className="chanList-chan" key={chan._id + "chan"}>
                <Link
                  onClick={() => {
                    setJoinChan((prevValue) => chan._id);
                  }}
                  to={`/chan/${chan._id}`}
                >
                  <div className="chanList-chan-content">
                    <img
                      className="chanList-image"
                      src={chan.image}
                      alt={chan.name}
                    />
                    <span>{chan.name}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ChanList;
