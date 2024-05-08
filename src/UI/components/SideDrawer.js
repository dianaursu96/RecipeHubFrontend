import React from "react";
import { NavLink } from "react-router-dom";
import "./SideDrawer.css";
import { MdLogout } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store/auth-slice";

const SideDrawer = () => {
  const dispatch = useDispatch();
  return (
    <div className="side-drawer">
      <ul>
        <li>
          <NavLink className=".active" to={`/profile`}>
            <FaRegUser />
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink className=".active" onClick={() => dispatch(authActions.logout())} to={`/login`}>
            <MdLogout />
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideDrawer;
