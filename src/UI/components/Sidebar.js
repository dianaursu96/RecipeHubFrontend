import React, { useEffect, useState } from "react";
import { ListItemButton, ListItemText, IconButton } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ menuItems, collapsed }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const handleItemClick = (path) => {
    setActivePath(path);
  };

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <nav className="sidebar">
      <ul className="menu-list">
        {menuItems?.map((menuItem, index) => (
          <li
            className={`menu-item ${
              menuItem.path === activePath ? "is-active" : ""
            }`}
            key={index}
          >
            <ListItemButton
              component={NavLink}
              to={menuItem.path}
              onClick={() => handleItemClick(menuItem.path)}
            >
              <IconButton>{menuItem.icon}</IconButton>
              {!collapsed && <ListItemText primary={menuItem.label} />}
            </ListItemButton>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
