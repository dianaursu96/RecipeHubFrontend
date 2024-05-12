import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readerActions } from "../../redux/store/reader-slice";
import MainContent from "./components/MainContent";
import Spinner from "../../UI/components/Spinner";
import axios from "axios";
import { alertActions } from "../../redux/store/alert-slice";
import AlertPopup from "../../UI/components/AlertPopup";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.alert.hasError);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: `http://localhost:8081/chef/recipes/all`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setRecipes(res.data.filter((recipe) => recipe.isPublished));
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
    recipes.length > 0 ? (
      <h1>
        {recipes.length} <span>published recipes</span>
      </h1>
    ) : (
      <h1>
        0 <span>published recipes</span>
      </h1>
    );

  return (
    <>
      {/* <AlertPopup /> */}
      <div className="banner-container" id="recipes">
        <div className="banner-title">{banner}</div>
      </div>
      {isLoading && <Spinner />}
      {error && (
        <main id="main-content" className="main-content-container">
          <h1>Error: {error.message}</h1>
        </main>
      )}
      {!isLoading && !error && (
        <>
          <MainContent recipes={recipes} />
        </>
      )}
    </>
  );
};

export default Home;
