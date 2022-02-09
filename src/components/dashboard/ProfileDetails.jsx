import React, { useState, useRef, useEffect, useContext } from "react";
import apiHandler from "./../../api/apiHandler";
import useAuth from "../../context/useAuth";
import { SocketContext } from "../../context/socket.context";

const ProfileDetails = () => {
  const { currentUser, isLoggedIn, removeUser, storeToken, authenticateUser } =
    useAuth();
  const { socket } = useContext(SocketContext);

  const [userToUpdate, setUserToUpdate] = useState({
    _id: "",
    username: "",
    email: "",
    avatar: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const avatarRef = useRef();

  useEffect(() => {
    if (currentUser) {
      apiHandler
        .get("/user", currentUser._id)
        .then((dbResponse) => {
          setUserToUpdate(dbResponse.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (!isLoggedIn) {
      setUserToUpdate(null);
    }
  }, [isLoggedIn]);

  const handleEditMode = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const SendForm = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("username", userToUpdate.username);
    fd.append("email", userToUpdate.email);
    fd.append("avatar", avatarRef.current.files[0]);

    try {
      // generate new token => storetoken et authenticateUser
      // storeToken();
      // authenticateUser();
      console.log(userToUpdate._id);
      const updatedUser = await apiHandler.patch(
        `/user/${userToUpdate._id}`,
        fd
      );
      setUserToUpdate((prevValue) => updatedUser.data);
      console.log(userToUpdate);
      setIsEditing(!isEditing);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = async (e) => {
    e.preventDefault();
    socket.disconnect();
    removeUser();
  };

  const confirmDelete = (e) => {
    e.preventDefault();
    setDeleteMode(true);
  };
  const cancelEdit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };
  const cancelDelete = (e) => {
    e.preventDefault();
    setDeleteMode(false);
    setIsEditing(true);
  };

  const deleteAccount = async (e) => {
    e.preventDefault();
    try {
      await apiHandler.delete(`/user/${userToUpdate._id}`);
      socket.disconnect();
      removeUser();
      setDeleteMode(false);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!currentUser) return <p>loading</p>;
  return (
    <div>
      {deleteMode && (
        <div style={{ width: "100vw", height: "100vw", color: "red" }}>
          <p>Are you sure ? This means goodbye... forever</p>
          <button onClick={cancelDelete}>Nope nope nopity nope</button>
          <button onClick={deleteAccount}>Delete for good</button>
        </div>
      )}
      {isEditing && (
        <form>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={userToUpdate.username}
            onChange={(e) => {
              setUserToUpdate({ ...userToUpdate, username: e.target.value });
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={userToUpdate.email}
            onChange={(e) => {
              setUserToUpdate({ ...userToUpdate, email: e.target.value });
            }}
          />
          <label htmlFor="avatar">avatar</label>
          <input type="file" name="avatar" id="avatar" ref={avatarRef} />
          <button onClick={SendForm}>Send</button>
          <button onClick={cancelEdit}> Nevermind, this is fine</button>
          <button onClick={confirmDelete}>Delete my account</button>
        </form>
      )}
      {!isEditing && (
        <div>
          <p>{userToUpdate?.username}</p>
          <p>{userToUpdate?.email}</p>
          <img src={userToUpdate?.avatar} alt={userToUpdate?.username} />
          <i className="fas fa-user-edit" onClick={handleEditMode}></i>
          <button onClick={handleDisconnect}>log-out</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
