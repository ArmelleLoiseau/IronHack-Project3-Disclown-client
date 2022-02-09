import axios from "axios";

import React, { useState, useContext, useEffect } from "react";

// contexts
import { ChanContext } from "../../context/chan.context";
import { UserContext } from "../../context/user.context";
import useAuth from "../../context/useAuth";

const CreateChan = () => {
  // Get all chans + function to create a new chan from context
  const { chans, addChan, setChans } = useContext(ChanContext);
  const { currentUser } = useAuth();

  const owner = currentUser;
  // console.log(owner);

  // new Chan variable
  const [chan, setChan] = useState({
    name: "",
    owner: owner,
  });

  const handleClick = async (e) => {
    e.preventDefault;
    try {
      const newChan = await axios.post(
        import.meta.env.VITE_APP_BACKEND_URL + "/chan",
        chan
      );
      addChan(newChan.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BACKEND_URL + "/chan", chan)
      .then((dbResponse) => setChans(dbResponse.data))
      .catch((e) => console.error(e));
  }, []);

  console.log("chans", chans);
  if (!chans) return <p>loading...</p>;

  return (
    <div>
      <h2>Chan List Perso</h2>
      <div>
        {chans.map((chan) => {
          return chan.owner ? (
            <div key={chan._id}>
              <p>{chan.name}</p>
            </div>
          ) : (
            <p></p>
          );
        })}
      </div>
      <div className="creteNewChan">
        <label htmlFor="name">Name</label>
        <input type="hidden" value={owner} />
        <input
          type="text"
          id="name"
          value={chan.name}
          onChange={(e) => setChan({ ...chan, name: e.target.value })}
        />
        <button onClick={handleClick}>Create a channel</button>
      </div>
    </div>
  );
};

export default CreateChan;
