import React, { Fragment, useState, useEffect } from "react";
import {
  FaFireAlt,
  FaRegClock,
  FaRegCheckCircle,
  FaHeart,
  FaArrowLeft,
} from "react-icons/fa";
import classes from "./RecipeDetail.module.css";
import { Link } from "react-router-dom";
import book from "../../assets/images/book.png";
import ingredientImage from "../../assets/images/ingredients.png";
import nutritionImage from "../../assets/images/nutirtion.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../UI/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { readerActions } from "../../redux/store/reader-slice";

const RecipeDetail = () => {
  const recipes = useSelector((state) => state.reader.recipes);
  const favourites = useSelector((state) => state.reader.favourites);
  const [recipe, setRecipe] = useState({});
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = location.state.id;
  const [favorited, setIsFavorited] = useState(favourites.includes(id));

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Fetch recipe details

  useEffect(() => {
    if (recipes.length) {
      setRecipe(recipes?.find((recipe) => recipe.id === id));
      return;
    }
    setIsLoading(true);
    axios({
      method: "GET",
      url: `http://localhost:8081/reader/recipes/${id}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setRecipe(res.data);
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
  }, []);

  const calorie = isNaN(Math.floor(recipe?.calories))
    ? "No calories"
    : Math.floor(recipe?.calories) + " calories";
  const time =
    recipe?.cookingTime > 0
      ? recipe?.cookingTime + " minutes"
      : "less than a minute";
  const tags = recipe?.tags?.split(",").map((tag) => <span>#{tag}</span>);
  const ingredients = recipe?.ingredients?.split("|").map((ingredient) => (
    <li>
      <span>
        <FaRegCheckCircle />
        {ingredient}
      </span>
    </li>
  ));
  const steps = recipe?.steps?.split("|").map((ingredient, i) => (
    <li>
      <span>
        Step {i + 1}: {ingredient}
      </span>
    </li>
  ));
  const nutrients =
    recipe?.totalNutrients &&
    Object.entries(recipe?.totalNutrients).map(([keys, nutrient]) => (
      <li>
        {nutrient.label} - {Math.floor(nutrient.quantity)} {nutrient.unit}
      </li>
    ));

  const favouriteHandler = () => {
    axios({
      method: favorited ? "DELETE" : "POST",
      url: `http://localhost:8081/reader/favourites/${
        favorited ? "delete" : "add"
      }?recipeId=${id}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setIsFavorited(!favorited);
          dispatch(readerActions.initializeFavourites(res.data));
          let userObject = JSON.parse(localStorage.getItem("userData"));
          userObject.favourites = res.data;
          // Store the updated user data back in localStorage
          localStorage.setItem("userData", JSON.stringify(userObject));
        } else {
          alert(res.error.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // SHOWING BUTTON DEPENDING ON THE ISFAVORITE STATE
  const favoriteButton = !!favorited ? (
    <button
      onClick={favouriteHandler}
      style={{
        background: "var(--primary)",
        color: "var(--primary-opacity",
      }}
    >
      <span>
        <FaHeart />
        Remove from Favorites
      </span>
    </button>
  ) : (
    <button onClick={favouriteHandler}>
      <span>
        <FaHeart />
        Add to Favorites
      </span>
    </button>
  );
  return (
    <Fragment>
      {isLoading && <Spinner />}
      <main id="main-content" className="main-content-container">
        {error && <h1>Error: {error.message}</h1>}
        {!isLoading && !error && (
          <div className={classes.recipe__container}>
            <div className={classes["recipe-image"]}>
              <div className={classes["recipe-image__container"]}>
                <img src={recipe.imageURL} alt="" />
              </div>
            </div>
            <div className={classes["recipe-details"]}>
              <h1>{recipe.title}</h1>
              <div className={classes["recipe-tag__calorie-time"]}>
                <div>
                  <span>
                    <FaFireAlt />
                  </span>
                  <span>{calorie}</span>
                </div>
                <div>
                  <span>
                    <FaRegClock />
                  </span>
                  <span>{time}</span>
                </div>
              </div>
              <div className={classes["recipe-tag-group"]}>{tags}</div>
            </div>

            <div className={classes["recipe__preparation"]}>
              <div>
                <img src={book} />
              </div>
              <h3>How to prepare?</h3>
              {steps}
            </div>
            <div className={classes["recipe-ingredients"]}>
              <div>
                <img src={ingredientImage} />
              </div>
              <h3>Ingredients</h3>
              <ul>{ingredients}</ul>
            </div>
            <div className={classes["recipe-nutritional-facts"]}>
              <div>
                <img src={nutritionImage} />
              </div>
              <h3>Nutrional facts</h3>
              <ul>{nutrients}</ul>
            </div>

            <div className={classes["favorites-button-group"]}>
              {favoriteButton}
              <button onClick={() => navigate(-1)}>
                <span>
                  <FaArrowLeft />
                  Go Back
                </span>
              </button>
            </div>
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default RecipeDetail;
