import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readerActions } from "../../redux/store/reader-slice";
import MainContent from "./components/MainContent";
import Spinner from "../../UI/components/Spinner";
import SearchRecipe from "./components/SearchRecipe";
import axios from "axios";

const Home = () => {
  const recipes = useSelector((state) => state.reader.recipes);
  const searchInput = useSelector((state) => state.reader.searchInput);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: `http://localhost:8081/reader/search?query=${searchInput}`,
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
          alert(res.error.message);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        setIsLoading(false);
        setError(err);
      });
  }, [searchInput]);

  const banner =
    recipes.length > 0 ? (
      <h1>
        {recipes.length} <span>Recipes Found</span>
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
      {isLoading && <Spinner />}
      {error && (
        <main id="main-content" className="main-content-container">
          <h1>Error: {error.message}</h1>
        </main>
      )}
      {!isLoading && !error && <MainContent recipes={recipes} />}
    </>
  );
};

export default Home;
