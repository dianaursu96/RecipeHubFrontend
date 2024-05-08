import React from "react";
import "./components/MainContent.css";
import { useSelector } from "react-redux";
import MainContent from "./components/MainContent";


const Favorites = () => {
    const favorites = useSelector((state) => state.recipes.favorites);

    // TRANSFORM DATA FROM FAVORITES REDUX STORE
    const recipes = favorites.map((recipe) => {
        return {
            recipeID: recipe.id,
            recipe: recipe.recipe.recipe,
            _links: recipe.recipe._links,
            uid: recipe.uid,
            isFavorite: recipe.isFavorite,
        };
    });

    // CONDITIONAL RENDERS
    const banner =
        recipes.length > 0 ? (
            <h1>
                {recipes.length} <span>favorite recipes</span>
            </h1>
        ) : (
            <h1>
                {"Your"} <span>{"favorite recipes"}</span>
            </h1>
        );

    return (
        <>
            <div className="banner-container" id="recipes">
                <div className="banner-title">{banner}</div>
            </div>
            <MainContent recipes={recipes} />
        </>
    );
};

export default React.memo(Favorites);
