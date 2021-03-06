import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// contexts
import { ChanContext } from "../../context/chan.context";

const ChanList = () => {
  const { chans, setChans, addChan } = useContext(ChanContext);

  useEffect(() => {
    axios
      .get("http://localhost:4001/chan")
      .then((dbResponse) => setChans(dbResponse.data))
      .catch((e) => console.error(e));
  }, []);

  if (!chans) return <p>loading...</p>;

  return (
    <div>
      {chans.map((chan) => {
        return (
          <Link to={`/chan/${chan._id}`} key={chan._id}>
            <p>{chan.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default ChanList;
