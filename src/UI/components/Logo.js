import React from "react";
import { FaUtensils, FaBook } from "react-icons/fa";
import "./Logo.css";
import { useNavigate } from "react-router";

const Logo = ({ className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <h1 className="logo-title">
        <FaUtensils className={`logo-primary ${className}`} />
        Recipe <span className="logo-secondary">Hub</span>{" "}
        <FaBook className={`logo-secondary ${className}`} />
      </h1>
    </div>
  );
};

export default Logo;
