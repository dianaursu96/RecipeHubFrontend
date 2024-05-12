import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import Footer from './Footer';
import { FaBars, FaAngleLeft } from "react-icons/fa";
import { IconButton, Divider } from "@mui/material";
import classes from "./Layout.module.css";

function Layout({ children, menuItems }) {
  const [openDrawer, setOpenDrawer] = useState(false); // State for drawer open/close

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <div className={classes.layout}>
      <Header />
      <Divider />
      <div className={classes.contentContainer}>
        <div
          className={`${classes.sidebar} ${
            openDrawer ? classes.open : classes.closed
          }`}
        >
          <IconButton onClick={toggleDrawer} className={classes.toggleButton}>
            {openDrawer ? <FaAngleLeft /> : <FaBars />}
          </IconButton>
          <Sidebar menuItems={menuItems} collapsed={!openDrawer} />
        </div>
        <main className={classes.mainContent}>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
