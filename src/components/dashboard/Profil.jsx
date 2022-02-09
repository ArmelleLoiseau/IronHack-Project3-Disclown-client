import React, { useState, useContext } from "react";
import "./dashboard-css/Profil.css";

// import contexts
import useAuth from "../../context/useAuth";
import ProfileDetails from "./ProfileDetails";

const Profil = () => {
  return (
    <div className="profil__container">
      <h2>Profil</h2>
      <ProfileDetails />
    </div>
  );
};

export default Profil;
