import React, { useState, useEffect, useContext } from "react";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import "./dashboard-css/list.css";

// contexts
import { ChanContext } from "../../context/chan.context";
import SearchChan from "./SearchChan";

const ChanList = () => {
  const { chans, setChans } = useContext(ChanContext);
  const [searchChan, setSearchChan] = useState("");

  useEffect(() => {
    apiHandler
      .get("/chan", chans)
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

  if (!chans) return <p>loading...</p>;
  return (
    <>
      <div className="chanlist">
        <div className="chanList-header">
          <h2>Chan List global</h2>
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
              <div className="chanList-chan">
                <Link to={`/chan/${chan._id}`} key={chan._id}>
                  <div className="chanList-chan-content">
                    <img
                      className="chanList-image"
                      src={chan.image}
                      alt={chan.name}
                    />
                    <h4>{chan.name}</h4>
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
