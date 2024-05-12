import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Registration from "./pages/registration/Registration";
import Login from "./pages/registration/Login";
import SignUp from "./pages/registration/SignUp";
import UserHomePage from "./pages/user/Home";
import ChefHomePage from "./pages/chef/Home";
import ChefCreationCenter from "./pages/chef/CreationCenter";
import AdminHomePage from "./pages/admin/Home";
import RecipeCreatePage from "./pages/chef/RecipeCreatePage";
import RecipeDetail from "./pages/user/RecipeDetail";
import RecipeDetailChef from "./pages/chef/RecipeDetail";
import Profile from "./UI/components/ProfilePage";
import Favorites from "./pages/user/Favorites";
import Layout from "./UI/components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/store/auth-slice";
import { readerActions } from "./redux/store/reader-slice";
import { FaHome, FaHeart, FaBook } from "react-icons/fa";

function App() {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      dispatch(
        authActions.login({
          id: storedData.uid,
          token: storedData.token,
          firstName: storedData.firstName,
          role: storedData.role,
        })
      );
      dispatch(readerActions.initializeFavourites(storedData.favourites));
    }
  }, []);

  const menuItemsReader = [
    { label: "Home", path: "/", icon: <FaHome /> },
    // { label: "Recipes", path: "/recipes", icon: <FaUtensils /> },
    { label: "Favourites", path: "/favorites", icon: <FaHeart /> },
    // { label: "References", path: "/references", icon: <FaBookOpen /> },
    // { label: "FAQ", path: "/faq", icon: <FaQuestionCircle /> },
  ];
  const menuItemsAdmin = [{ label: "Home", path: "/", icon: <FaHome /> }];

  const menuItemsChef = [
    { label: "Home", path: "/", icon: <FaHome /> },
    { label: "Creation Center", path: "/creation", icon: <FaBook /> },
  ];

  const readerRoutes = (
    <>
      <Route
        path="/"
        element={
          <Layout menuItems={menuItemsReader}>
            <UserHomePage />
          </Layout>
        }
      />
      <Route
        path="/favorites"
        element={
          <Layout menuItems={menuItemsReader}>
            <Favorites />
          </Layout>
        }
      />
      <Route
        path="/recipe/details/:id/*"
        element={
          <Layout menuItems={menuItemsReader}>
            <RecipeDetail />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout menuItems={menuItemsReader}>
            <Profile />
          </Layout>
        }
      />
    </>
  );

  const adminRoutes = (
    <>
      <Route
        path="/"
        element={
          <Layout menuItems={menuItemsAdmin}>
            <AdminHomePage />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout menuItems={menuItemsAdmin}>
            <Profile />
          </Layout>
        }
      />
    </>
  );

  const chefRoutes = (
    <>
      <Route
        path="/"
        element={
          <Layout menuItems={menuItemsChef}>
            <ChefHomePage />
          </Layout>
        }
      />
      <Route
        path="/recipes/:id"
        element={
          <Layout menuItems={menuItemsChef}>
            <RecipeCreatePage />
          </Layout>
        }
      />
      <Route
        path="/creation"
        element={
          <Layout menuItems={menuItemsChef}>
            <ChefCreationCenter />
          </Layout>
        }
      />
      <Route
        path="/recipe/details/:id/*"
        element={
          <Layout menuItems={menuItemsChef}>
            <RecipeDetailChef />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout menuItems={menuItemsChef}>
            <Profile />
          </Layout>
        }
      />
    </>
  );

  return (
    <Routes>
      {!token && (
        <>
          <Route
            path="*"
            element={
              <h1>
                Unauthorized Access.{" "}
                <Link to="/login">Click here to login your account</Link>
              </h1>
            }
          />
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </>
      )}

      {token && role === "READER" && readerRoutes}
      {token && role === "ADMIN" && adminRoutes}
      {token && role === "CHEF" && chefRoutes}
    </Routes>
  );
}

export default App;
