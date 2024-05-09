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
          imageURL={recipe.imageURL}
          name={recipe.title}
          calories={recipe.calories}
          cookingTime={recipe.cookingTime}
          tags={recipe.tags}
          ingredients={recipe.ingredients}
          isFavorite={recipe.isFavorite}
        />
      ))}
    </div>
  );
};

export default RecipeList;
