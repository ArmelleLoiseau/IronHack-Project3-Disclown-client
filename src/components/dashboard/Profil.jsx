import React, { useState, useContext } from "react";
import "./dashboard-css/Profil.css";

// import contexts
import useAuth from "../../context/useAuth";
import ProfileDetails from "./ProfileDetails";

const Profil = () => {
  return (
    <div className="profil__container">
      <ProfileDetails />
    </div>
  );
};

export default Profil;
