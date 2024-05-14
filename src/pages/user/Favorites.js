import React, { useEffect, useState } from "react";
import "./components/MainContent.css";
import { useDispatch, useSelector } from "react-redux";
import { readerActions } from "../../redux/store/reader-slice";
import MainContent from "./components/MainContent";
import Spinner from "../../UI/components/Spinner";
import axios from "axios";
import { alertActions } from "../../redux/store/alert-slice";

const Favorites = () => {
  const error = useSelector((state) => state.alert.hasError);
  const favorites = useSelector((state) => state.reader.recipes);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: `https://recipe-hub-srv-9501da59a43f.herokuapp.com/reader/recipes/favourites`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            readerActions.searchRecipeData({
              searchedRecipes: res.data,
            })
          );
        } else {
          dispatch(alertActions.setErrorMessage(res.error.message));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(alertActions.setErrorMessage(err.message));
        setIsLoading(false);
      });
  }, []);

  const banner =
    favorites.length > 0 ? (
      <h1>
        {favorites.length} <span>favorite recipes</span>
      </h1>
    ) : (
      <h1>
        {"Your"} <span>{"favorite recipes"}</span>
      </h1>
    );

  return (
    <>
      <div className="banner-container" id="recipes">
        <div className="banner-title">{banner}</div>
      </div>
      {isLoading && <Spinner />}
      {error && (
        <main id="main-content" className="main-content-container">
          <h1>Error: {error.message}</h1>
        </main>
      )}
      {!isLoading && !error && <MainContent recipes={favorites} />}
    </>
  );
};

export default React.memo(Favorites);
