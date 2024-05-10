import React, { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Avatar.module.css";
import SideDrawer from "./SideDrawer";
import profile from "../../assets/images/profile.png";

const Avatar = () => {
  const firstName = useSelector((state) => state.auth.firstName);
  const [openPanel, setOpenPanel] = useState(false);
  const togglePanel = () => {
    setOpenPanel(!openPanel);
  };
  return (
    <>
      {openPanel && <SideDrawer />}
      <button onClick={togglePanel} className={classes.avatar__container}>
        <div className={classes.avatar__image}>
          <img src={profile} />
        </div>
        <h2 className={classes.avatar__text}>Welcome, {firstName}</h2>
      </button>
    </>
  );
};

export default Avatar;
