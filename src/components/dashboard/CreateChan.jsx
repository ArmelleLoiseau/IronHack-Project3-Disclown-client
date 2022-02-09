import axios from "axios";

import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

// contexts
import { ChanContext } from "../../context/chan.context";
// import { UserContext } from "../../context/user.context";
import useAuth from "../../context/useAuth";
import { SocketContext } from "../../context/socket.context";

const CreateChan = () => {
  // Get all chans + function to create a new chan from context
  // const { chans, addChan, setChans } = useContext(ChanContext);
  const { currentUser } = useAuth();
  const { setNewChan, chans, setChans, addChan } = useContext(SocketContext);

  const currentUserID = currentUser._id;
  console.log("who is the owner ?", currentUserID);

  // new Chan variable
  const [chan, setChan] = useState({
    name: "",
    owner: currentUserID,
  });

  const [addedChan, setAddedChan] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault;
    try {
      const newChan = await axios.post(
        import.meta.env.VITE_APP_BACKEND_URL + "/chan",
        chan
      );
      setAddedChan(true);
      addChan(newChan.data);
      setAddedChan(false);
      setNewChan(newChan.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BACKEND_URL + "/chan")
      .then((dbResponse) => {
        console.log(dbResponse.data);
        setChans(dbResponse.data);
      })
      .catch((e) => console.error(e));
  }, [addedChan]);

  const filteredChans = chans.filter((c) => {
    return c.owner._id === currentUserID;
  });

  if (!chans) return <p>loading...</p>;

  return (
    <>
      <div className="chanList-content">
        <div className="chanList-header">
          <h2>Chan List Perso</h2>
          <div className="creteNewChan">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={chan.name}
              onChange={(e) => setChan({ ...chan, name: e.target.value })}
            />
            <button onClick={handleClick}>Create a channel</button>
          </div>
        </div>
        <div>
          {filteredChans.map((chan) => {
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
      </div>
    </>
  );
};

export default CreateChan;

// {
//   chans.map((chan) => {
//     return chan.owner === currentUser._id ? (
//       <Link to={`/chan/${chan._id}`} key={chan._id}>
//         <div key={chan._id}>
//           {/* <img src={chan.image} alt={chan.name} /> */}
//           <p>{chan.name}</p>
//         </div>
//       </Link>
//     ) : (
//       <p></p>
//     );
//   });
// }
