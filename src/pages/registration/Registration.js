import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../UI/components/Logo";
import classes from "./Registration.module.css";

const Registration = () => {
  return (
    <div className={classes.registration}>
      <Logo />
      <div className={classes.registration__buttons}>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Registration;
