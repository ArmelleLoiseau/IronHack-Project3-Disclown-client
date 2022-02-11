import apiHandler from "../../api/apiHandler";
import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./dashboard-css/list.css";
import "./dashboard-css/formEdit.css";

// contexts
import useAuth from "../../context/useAuth";
import { SocketContext } from "../../context/socket.context";

const CreateChan = () => {
  const { currentUser } = useAuth();
  const { chans, setChans, addChan, setJoinChan } = useContext(SocketContext);

  const currentUserID = currentUser._id;

  // new Chan variable
  const [chan, setChan] = useState({
    name: "",
    owner: currentUserID,
  });

  const [chanToUpdate, setChanToUpdate] = useState({
    name: "",
    image: "",
  });

  //set the editingmode to display different views
  const [isEditing, setIsEditing] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  // catch the avatar input for form data
  const imageRef = useRef();

  const [addedChan, setAddedChan] = useState(false);
  const [filteredChans, setFilteredChans] = useState([]);

  useEffect(() => {
    apiHandler
      .get("/chan")
      .then((dbResponse) => {
        console.log(
          "SERIOUSLY ?? db reponse just before setChans =>",
          dbResponse.data
        );
        setChans(dbResponse.data);
      })
      .catch((e) => console.error(e));
  }, [addedChan, chanToUpdate]);

  useEffect(() => {
    console.log("useEffect : where are the chans ? :", chans);
    setFilteredChans(
      chans.filter((c) => {
        return c.owner._id === currentUserID;
      })
    );
  }, [addedChan, chans, chan]);

  const handleClick = async (e) => {
    e.preventDefault;
    try {
      const newChan = await apiHandler.post("/chan", chan);
      setAddedChan(true);
      addChan(newChan.data);
      setAddedChan(false);
      setChan({ ...chan, name: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditMode = (id) => {
    apiHandler
      .get(`/chan/${id}`)
      .then((dbResponse) => {
        setChanToUpdate(dbResponse.data);
        console.log(dbResponse.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setIsEditing(true);
  };

  const handleEditChan = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", chanToUpdate.name);
    fd.append("image", imageRef.current.files[0]);

    try {
      console.log("chanToUpdate", chanToUpdate);
      const dbResponse = await apiHandler.patch(
        `/chan/${chanToUpdate._id}`,
        fd
      );

      setChanToUpdate((prevValue) => dbResponse.data);
      setIsEditing(!isEditing);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelEditChan = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };
  // ask user to confirm delete/edit ops
  const confirmDelete = (e) => {
    e.preventDefault();
    setDeleteMode(true);
  };
  const cancelDelete = (e) => {
    e.preventDefault();
    setDeleteMode(false);
    setIsEditing(true);
  };

  //delete chan
  const deleteChan = async (e) => {
    try {
      await apiHandler.delete(`/chan/${chanToUpdate._id}`);
      setDeleteMode(false);
      setIsEditing(false);
    } catch (error) {}
  };

  if (!chans) return <p>loading...</p>;

  return (
    <div>
      {isEditing && (
        <div>
          <span>Edit your channel</span>
          <form className="formEdit-form">
            <label className="formEdit-label" htmlFor="name">
              Name
            </label>
            <input
              className="formEdit-input"
              type="text"
              value={chanToUpdate.name}
              onChange={(e) =>
                setChanToUpdate({ ...chanToUpdate, name: e.target.value })
              }
            />
            <label className="formEdit-label" htmlFor="name">
              Image
            </label>
            <input
              className="formEdit-input-file"
              ref={imageRef}
              type="file"
              name="image"
            />
            <div className="formEdit-btn">
              <button onClick={handleEditChan}>Edit</button>
              <button onClick={handleCancelEditChan}>Cancel Edit</button>
              <button onClick={confirmDelete}>Delete Chan</button>
            </div>
          </form>
        </div>
      )}
      {deleteMode && (
        <>
          <div className="formEdit-deleteMode">
            <p>Are you sure ?</p>
            <div className="formEdit-deleteMode-btn">
              <button onClick={cancelDelete}>Nope nope nopity nope</button>
              <button onClick={deleteChan}>Delete for good</button>
            </div>
          </div>
        </>
      )}

      {!isEditing && (
        <div className="chanlist">
          <div className="chanList-header">
            <span>Your own channels</span>
            <div className="create-chan">
              <input
                placeholder="Enter a name for a new channel"
                type="text"
                id="name"
                value={chan.name}
                onChange={(e) => setChan({ ...chan, name: e.target.value })}
              />
              <span onClick={handleClick}>Create</span>
            </div>
          </div>

          <div className="chanList-content">
            {filteredChans.map((chan) => {
              return (
                <div className="chanList-chan" key={chan._id + "filtered"}>
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
                  <div className="chanList-editBtn">
                    <i
                      className="fa-solid fa-wrench "
                      onClick={() => handleEditMode(chan._id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
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
