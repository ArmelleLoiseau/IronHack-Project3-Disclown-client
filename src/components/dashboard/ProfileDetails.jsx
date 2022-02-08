import React, { useState, useRef, useEffect } from "react";
import apiHandler from "./../../api/apiHandler";
import useAuth from "../../context/useAuth";

const ProfileDetails = () => {
  const { currentUser, isLoggedIn } = useAuth();
  const [userToUpdate, setUserToUpdate] = useState({
    _id: "",
    username: "",
    email: "",
    avatar: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log("====> currentUser", currentUser);
    if (currentUser) {
      console.log("am i in the if ?");
      apiHandler
        .get(import.meta.env.VITE_APP_BACKEND_URL + "/user", currentUser._id)
        .then((dbResponse) => {
          setUserToUpdate(dbResponse.data);
          console.log("===> bdResponse", dbResponse.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (!isLoggedIn) {
      setUserToUpdate(null);
    }
  }, [isLoggedIn]);

  //   const [updatedUser, setUpdatedUser] = useState({
  //     username: currentUsername,
  //     email: currentEmail,
  //     avatar: "",
  //   });

  const avatarRef = useRef();
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

    // try {
    //   // generate new token => storetoken et authenticateUser
    //   //   await apiHandler.patch();
    // } catch (error) {
    //   console.error(error);
    // }

    setIsEditing(false);
  };

  if (!currentUser) return <p>loading</p>;
  return (
    <div>
      {isEditing ? (
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
        </form>
      ) : (
        <div>
          <p>{userToUpdate?.username}</p>
          <p>{userToUpdate?.email}</p>
          <img src={userToUpdate?.avatar} alt={userToUpdate?.username} />
          <i className="fas fa-user-edit" onClick={handleEditMode}></i>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
