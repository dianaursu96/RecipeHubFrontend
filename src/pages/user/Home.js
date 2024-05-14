import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readerActions } from "../../redux/store/reader-slice";
import MainContent from "./components/MainContent";
import Spinner from "../../UI/components/Spinner";
import SearchRecipe from "./components/SearchRecipe";
import axios from "axios";
import CategoryBar from "./components/CategoryBar";
import { alertActions } from "../../redux/store/alert-slice";

const Home = () => {
  const recipes = useSelector((state) => state.reader.recipes);
  const searchInput = useSelector((state) => state.reader.searchInput);
  const currentCategory = useSelector((state) => state.reader.currentCategory);
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.alert.hasError);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: `https://recipe-hub-srv-9501da59a43f.herokuapp.com/reader/search?query=${searchInput}&category=${currentCategory}`,
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
        setIsLoading(false);
        dispatch(alertActions.setErrorMessage(err.message));
      });
  }, [searchInput, currentCategory]);

  const banner =
    searchInput !== "" ? (
      <h1>
        {recipes.length}{" "}
        <span>
          Recipes Found {searchInput !== "" ? `for '${searchInput}'` : ""}
        </span>
      </h1>
    ) : (
      <h1>
        {"Discover"} <span>{"recipes"}</span>
      </h1>
    );

  return (
    <>
      <div className="banner-container" id="recipes">
        <div className="banner-title">{banner}</div>
        <SearchRecipe className="search__container" />
      </div>
      <CategoryBar />
      {isLoading && <Spinner />}
      {!isLoading && !error && (
        <>
          <MainContent recipes={recipes} />
        </>
      )}
    </>
  );
};

export default Home;
