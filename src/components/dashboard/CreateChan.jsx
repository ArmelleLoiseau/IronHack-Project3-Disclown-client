import axios from "axios";

import React, { useState, useContext } from "react";
import socket from "../../socket";

// contexts
import { ChanContext } from "../../context/chan.context";
import { UserContext } from "../../context/user.context";

const CreateChan = () => {
  // Get all chans + function to create a new chan from context
  const { chans, addChan } = useContext(ChanContext);

  // get all Users from context
  const { users } = useContext(UserContext);

  // new Chan variable
  const [chan, setChan] = useState({
    name: "",
    // A faire : rajouter l'id du owner (socket.userEmail),
    // owner: "",
  });

  const handleClick = async (e) => {
    e.preventDefault;
    try {

      const newChan = await axios.post("http://localhost:4000/chan", chan);
      console.log("success");
      addChan(newChan.data);
      console.log("db response", newChan.data);
      console.log("updated chans", chans);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        value={chan.name}
        onChange={(e) => setChan({ ...chan, name: e.target.value })}
      />
      <button onClick={handleClick}>Create a channel</button>
    </div>
  );
};

export default CreateChan;
