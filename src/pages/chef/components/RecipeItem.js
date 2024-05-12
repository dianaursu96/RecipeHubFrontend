import React from "react";
import { Link } from "react-router-dom";
import { FaFireAlt, FaRegClock } from "react-icons/fa";
import "./RecipeItem.css";
import Card from "../../user/components/Card";

const RecipeItem = ({ id, name, calories, cookingTime, tags, imageURL }) => {
  const calorieText = isNaN(Math.floor(calories))
    ? "No calories"
    : Math.floor(calories) + " calories";
  const timeText =
    cookingTime > 1 ? cookingTime + " minutes" : "less than a minute";
  const hashtags = tags?.split(",").map((tag) => <span>#{tag}</span>);

  return (
    <Card className="recipe-item-container">
      <div className="recipe-card-header">
        <div>
          <Link
            to={`/recipe/details/${id}`}
            state={{
              id: id,
            }}
          >
            <img src={imageURL} alt="not available" />
          </Link>
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
