import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Registration from "./pages/registration/Registration";
import Login from "./pages/registration/Login";
import SignUp from "./pages/registration/SignUp";
import UserHomePage from "./pages/user/Home";
import ChefHomePage from "./pages/chef/Home";
import AdminHomePage from "./pages/admin/Home";
import RecipeCreatePage from "./pages/chef/RecipeCreatePage";
import RecipeDetail from "./pages/user/RecipeDetail";
import Favorites from "./pages/user/Favorites";
import Layout from "./UI/components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/store/auth-slice";
import { readerActions } from "./redux/store/reader-slice";

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

  // Define routes based on user role
  const readerRoutes = (
    <>
      <Route
        path="/"
        element={
          <Layout>
            <UserHomePage />
          </Layout>
        }
      />
      <Route
        path="/favorites"
        element={
          <Layout>
            <Favorites />
          </Layout>
        }
      />
      <Route
        path="/recipe/details/:id/*"
        element={
          <Layout>
            <RecipeDetail />
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
          <Layout>
            <AdminHomePage />
          </Layout>
        }
      />
      {/* <Route path="/users" element={<Layout><Users /></Layout>} /> */}
    </>
  );

  const chefRoutes = (
    <>
      <Route
        path="/"
        element={
          <Layout>
            <ChefHomePage />
          </Layout>
        }
      />
      <Route
        path="/recipes/:id"
        element={
          <Layout>
            <RecipeCreatePage />
          </Layout>
        }
      />
      <Route
        path="/create"
        element={
          <Layout>
            <RecipeCreatePage />
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
