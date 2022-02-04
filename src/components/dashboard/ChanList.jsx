import React, { useState, useEffect } from "react";
import axios from "axios";

const ChanList = () => {
  const [chans, setChans] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/chan")
      .then((dbResponse) => setChans(dbResponse.data))
      .catch((e) => console.error(e));
  }, []);

  if (!chans) return <p>loading...</p>;
  else console.log("chans", chans);

  return (
    <div>
      {chans.map((chan) => {
        return <p key={chan._id}>{chan.name}</p>;
      })}
    </div>
  );
};

export default ChanList;
