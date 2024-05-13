import React, { Fragment, useState, useEffect } from "react";
import { FaFireAlt, FaRegClock, FaHeart, FaArrowLeft } from "react-icons/fa";
import { IoIosCheckbox } from "react-icons/io";
import classes from "./RecipeDetail.module.css";
import book from "../../assets/images/book.png";
import ingredientImage from "../../assets/images/ingredients.png";
import nutritionImage from "../../assets/images/nutirtion.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../UI/components/Spinner";
import { MdLocalFireDepartment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../redux/store/alert-slice";
import { CiCircleCheck } from "react-icons/ci";

const RecipeDetail = () => {
  const recipes = useSelector((state) => state.reader.recipes);
  const error = useSelector((state) => state.alert.hasError);
  const [recipe, setRecipe] = useState({});
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = location.state.id;

  const [isLoading, setIsLoading] = useState(false);
  // Fetch recipe details

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: `http://localhost:8081/chef/recipes/${id}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setRecipe(res.data);
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

  const calories = isNaN(Math.floor(recipe?.calories))
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
        <CiCircleCheck />
        {ingredient}
      </span>
    </li>
  ));

  const steps = recipe?.steps?.split("|").map((ingredient, i) => (
    <li>
      <span>
        <b>Step {i + 1}:</b> {ingredient}
      </span>
    </li>
  ));

  const nutrientsData = [
    { label: "Calories", value: `${recipe?.calories} kcal` },
    { label: "Protein", value: `${recipe?.protein}g` },
    { label: "Fat", value: `${recipe?.fat}g` },
    { label: "Carb", value: `${recipe?.carb}g` },
  ];
  const nutrientList = nutrientsData.map((nutrient) => (
    <li key={nutrient.label}>
      <span>
        <MdLocalFireDepartment /> <b>{nutrient.label}</b> : {nutrient.value}
      </span>
    </li>
  ));

  return (
    <Fragment>
      {/* <AlertPopup /> */}
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
                  <span>{calories}</span>
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

            <div className={classes["recipe-preparation"]}>
              <div>
                <img src={book} />
              </div>
              <h3>How to prepare?</h3>
              <ul>{steps}</ul>
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
              <h3>Nutritional facts / 100g</h3>
              <ul>{nutrientList}</ul>
            </div>

            <div className={classes["favorites-button-group"]}>
              <button onClick={() => navigate(-1)}>
                <span>
                  <FaArrowLeft />
                  Go to previous page
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
