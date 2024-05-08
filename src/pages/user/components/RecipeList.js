import React from "react";
import "./RecipeList.css";
import RecipeItem from "./RecipeItem";

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipeList__container">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.recipeID}
          recipeID={recipe.recipeID}
          id={recipe._links.self.href}
          image={recipe.recipe?.image}
          name={recipe.recipe?.label}
          calories={recipe.recipe?.calories}
          time={recipe.recipe?.totalTime}
          mealType={recipe.recipe?.mealType}
          dishType={recipe.recipe?.dishType}
          cuisineType={recipe.recipe?.cuisineType}
          isFavorite={recipe.isFavorite}
        />
      ))}
    </div>
  );
};

export default RecipeList;
