import axios from "axios";
import React, { useState } from "react";
import socket from "../../socket";

const CreateChan = ({addChan}) => {
  const [chan, setChan] = useState({
    name: "",
    // A faire : rajouter l'id du owner (socket.userEmail),
  });

  const handleClick = async (e) => {
    e.preventDefault;
    try {
     const newChan = await axios.post("http://localhost:4000/chan", chan);
      console.log("success");
      addChan(newChan.data)
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
