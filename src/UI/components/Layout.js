import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
// import Footer from './Footer';
import { FaBars, FaAngleLeft, FaHome, FaUtensils, FaHeart, FaBookOpen, FaQuestionCircle} from 'react-icons/fa';
import { IconButton, Divider} from '@mui/material';
import classes from './Layout.module.css';

function Layout({ children }) {
    const menuItems = [
        { label: 'Home', path: '/', icon: <FaHome /> },
        { label: 'Recipes', path: '/recipes', icon: <FaUtensils /> },
        { label: 'Favorites', path: '/favorites', icon: <FaHeart /> },
        { label: 'References', path: '/references', icon: <FaBookOpen /> },
        { label: 'FAQ', path: '/faq', icon: <FaQuestionCircle /> },
    ];
    const [openDrawer, setOpenDrawer] = useState(false); // State for drawer open/close

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    return (
      <div className={classes.layout}>
            <Header />
            <Divider />
            <div className={classes.contentContainer}>
                <div className={`${classes.sidebar} ${openDrawer ? classes.open : classes.closed}`}>
                    <IconButton onClick={toggleDrawer} className={classes.toggleButton}>
                        {openDrawer ? <FaAngleLeft /> : <FaBars />}
                    </IconButton>
                    <Sidebar menuItems={menuItems} collapsed={!openDrawer} />
                </div>
                <main className={classes.mainContent}>{children}</main>
            </div>
            {/* <div className={classes.footer}>
                <Footer />
            </div> */}
        </div>
    );
}

export default Layout;
