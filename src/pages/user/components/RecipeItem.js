import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFireAlt, FaRegClock, FaHeart } from "react-icons/fa";
import "./RecipeItem.css";
import Card from "./Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { recipeActions } from "../../../redux/store/recipe-slice";

const RecipeItem = ({
  id,
  name,
  isFavorite,
  calories,
  cookingTime,
  tags,
  imageURL,
}) => {
  const token = useSelector((state) => state.auth.token);

  const [favorited, setFavorited] = useState(!!isFavorite);

  const dispatch = useDispatch();
  const calorieText = isNaN(Math.floor(calories))
    ? "No calories"
    : Math.floor(calories) + " calories";
  const timeText =
    cookingTime > 1 ? cookingTime + " minutes" : "less than a minute";
  const hashtags = tags?.split(",").map((tag) => <span>#{tag}</span>);

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
          setFavorited(!favorited);
          dispatch(recipeActions.initializeFavourites(res.data));
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

  return (
    <Card className="recipe-item-container">
      <div className="recipe-card-header">
        <div>
          <Link
            to={`/recipe/details/${id}`}
            state={{
              id: id,
              favorited: favorited,
            }}
          >
            <img src={imageURL} alt="not available" />
          </Link>
          <div className="favorites-button-group">
            {favorited ? (
              <button
                onClick={favouriteHandler}
                style={{
                  background: "var(--inverse)",
                  color: "var(--primary)",
                }}
              >
                <FaHeart />
              </button>
            ) : (
              <button
                onClick={favouriteHandler}
                style={{
                  background: "var(--inverse)",
                  color: "var(--secondary-opacity)",
                }}
              >
                <FaHeart />
              </button>
            )}
          </div>
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
        <div className="recipe-tag-group">{hashtags}</div>
      </div>
    </Card>
  );
};

export default React.memo(RecipeItem);
