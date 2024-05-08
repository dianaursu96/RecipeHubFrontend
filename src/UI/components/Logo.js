import React from "react";
import { FaUtensils, FaBook } from "react-icons/fa";
import "./Logo.css";
const Logo = ({className}) => {
  return (
    <div>
      <h1 className="logo-title">
        <FaUtensils className={`logo-primary ${className}`} />
        Recipe <span className="logo-secondary">Hub</span>{" "}
        <FaBook className={`logo-secondary ${className}`} />
      </h1>
    </div>
  );
};

export default Logo;
