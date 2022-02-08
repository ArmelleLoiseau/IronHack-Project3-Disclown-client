import React, { useState, useContext } from "react";

// import contexts
import useAuth from "../../context/useAuth";
import ProfileDetails from "./ProfileDetails";

const Profil = () => {
  return (
    <div>
      <h2>Profil</h2>
      <ProfileDetails />
    </div>
  );
};

export default Profil;
