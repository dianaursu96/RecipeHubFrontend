import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFireAlt, FaRegClock, FaHeart } from "react-icons/fa";
import "./RecipeItem.css";
import Card from "./Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { recipeActions } from "../../../redux/store/recipe-slice";

const API_URL = "http://localhost:8080/api";

const RecipeItem = ({
  id,
  isFavorite,
  calories,
  time,
  cuisineType,
  dishType,
  mealType,
  image,
  name,
}) => {
  const uid = useSelector((state) => state.auth.uid);
  const token = useSelector((state) => state.auth.token);

  const [recipeData, setRecipeData] = useState({});
  const [favStatus, setFavStatus] = useState(!!isFavorite);

  const dispatch = useDispatch();
  const calorieText = isNaN(Math.floor(calories))
    ? "No calories"
    : Math.floor(calories) + " calories";
  const timeText = time > 0 ? time + " minute(s)" : "less than a minute";
  const cuisineTags =
    cuisineType &&
    cuisineType.map((cuisine) => <span key={cuisine}>{cuisine}</span>);
  const dishTags =
    dishType && dishType.map((dish) => <span key={dish}>{dish}</span>);
  const mealTags =
    mealType && mealType.map((meal) => <span key={meal}>{meal}</span>);

  useEffect(() => {
    if (Object.keys(recipeData).length !== 0) {
      axios({
        method: "POST",
        url: `${API_URL}/recipes/${uid}`,
        data: { recipe: recipeData },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res.status === 201) {
            alert(res.data.message);
            setFavStatus(!favStatus);
            dispatch(recipeActions.addToFavorites(res.data.recipe));
          } else {
            alert(res.error.message);
          }
        })
        .catch((err) => alert(err.message));
    }
  }, [recipeData]);

  const addToFavoriteHandler = () => {
    axios.get(id).then((res) => {
      if (res.status === 200) {
        setRecipeData(res.data);
      }
    });
  };

  const removeFromFavoriteHandler = () => {
    axios({
      method: "DELETE",
      url: `${API_URL}/recipes/${id}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          dispatch(recipeActions.removeFromFavorites(id));
        } else {
          alert(res.error);
        }
      })
      .catch((err) => alert(err.message));
    setFavStatus(!favStatus);
  };

  const favoriteButton = favStatus ? (
    <button
      onClick={removeFromFavoriteHandler}
      style={{
        background: "var(--inverse)",
        color: "var(--primary)",
      }}
    >
      <FaHeart />
    </button>
  ) : (
    <button
      onClick={addToFavoriteHandler}
      style={{
        background: "var(--inverse)",
        color: "var(--secondary-opacity)",
      }}
    >
      <FaHeart />
    </button>
  );

  return (
    <Card className="recipe-item-container">
      <div className="recipe-card-header">
        <div>
          <Link
            to={`/recipe/details/${id}`}
            state={{
              favorited: favStatus,
              id: id,
              favoriteID: id,
            }}
          >
            <img src={image} alt="not available" />
          </Link>
          <div className="favorites-button-group">{favoriteButton}</div>
        </div>
      </div>
      <div className="recipe-card-body">
        <div className="recipe-title">
          <h1>{name}</h1>
        </div>
        <div className="recipe-details">
          <div className="recipe-tag__calorie-time">
            <span>
              <FaFireAlt />
              {calorieText}
            </span>
            <span>
              <FaRegClock />
              {timeText}
            </span>
          </div>
        </div>
        <div className="recipe-tag-group">
          {cuisineTags}
          {dishTags}
          {mealTags}
        </div>
      </div>
    </Card>
  );
};

export default React.memo(RecipeItem);
