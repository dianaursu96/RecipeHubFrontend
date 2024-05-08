import React from "react";
import "./RecipeList.css";
import RecipeItem from "./RecipeItem";

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipeList__container">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          id={recipe.id}
          image={recipe.image}
          name={recipe.title}
          calories={recipe.calories}
          time={recipe.totalTime}
          mealType={recipe.mealType}
          dishType={recipe.dishType}
          cuisineType={recipe.cuisineType}
          isFavorite={recipe.isFavorite}
        />
      ))}
    </div>
  );
};

export default RecipeList;
