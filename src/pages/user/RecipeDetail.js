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
import { useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../../UI/components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { recipeActions } from "../../redux/store/recipe-slice";

const API_URL = "http://localhost:8080/api";

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState([]);
    const [recipeData, setRecipeData] = useState({});
    const [newAddedFavoriteID, setNewAddedFavoriteID] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const uid = useSelector((state) => state.auth.uid);
    const location = useLocation();
    const dispatch = useDispatch();
    const id = location.state.id;
    const recipeEndpoint = location.state.recipeID;
    const [favorited, setIsFavorited] = useState(location.state.favorited);
    const favoriteID = location.state.favoriteID || newAddedFavoriteID;

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
   // Fetch recipe details
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(recipeEndpoint);
                setRecipe(response.data.recipe);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [recipeEndpoint]);

    const calorie = isNaN(Math.floor(recipe?.calories)) ? "No calories" : Math.floor(recipe?.calories) + " calories";
    const time = recipe?.time > 0 ? recipe?.time + "minute(s)" : "less than a minute";
    const cuisineType = recipe?.cuisineType && recipe?.cuisineType.map((cuisine) => <span>{cuisine}</span>);
    const dishType = recipe?.cuisineType && recipe?.dishType.map((dish) => <span>{dish}</span>);
    const mealType = recipe?.cuisineType && recipe?.mealType.map((meal) => <span>{meal}</span>);
    const ingredients = recipe?.ingredientLines && recipe?.ingredientLines.map((ingredient) => <li><span><FaRegCheckCircle />{ingredient}</span></li>);
    const nutrients = recipe?.totalNutrients && Object.entries(recipe?.totalNutrients).map(([keys, nutrient]) => <li>{nutrient.label} - {Math.floor(nutrient.quantity)} {nutrient.unit}</li>);

    // ADDING RECIPE TO DATABASE
    useEffect(() => {
        if (Object.keys(recipeData).length !== 0) {
            axios({
                method: "POST",
                url: `${API_URL}/recipe/${uid}`,
                data: { recipe: recipeData },
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
                .then((res) => {
                    if (res.status === 201) {
                        alert(res.data.message);
                        dispatch(recipeActions.addToFavorites(res.data.recipe));
                        setNewAddedFavoriteID(res.data.recipe.id);
                        setIsFavorited(!favorited);

                        setRecipeData({});
                    } else {
                        alert(res.error.message);
                    }
                })
                .catch((err) => alert(err.message));
        }
    }, [recipeData]);

    // GET ALL FAVORITES FROM DATABASE
    const addToFavoriteHandler = () => {
        axios.get(id).then((res) => {
            if (res.status === 200) {
                setRecipeData(res.data);
            }
        });
    };
    const removeFromFavoriteHandler = () => {
        axios({
            url: `${API_URL}/recipe/${favoriteID}`,
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then((res) => {
            if (res.status === 200) {
                alert(res.data.message);
                setIsFavorited(!favorited);

                dispatch(recipeActions.removeFromFavorites(favoriteID));
            } else {
                alert(res.error.message);
            }
        });
    };

    // SHOWING BUTTON DEPENDING ON THE ISFAVORITE STATE
    const favoriteButton = !!favorited ? (
        <button
            onClick={removeFromFavoriteHandler}
            style={{
                background: "var(--primary)",
                color: "var(--primary-opacity",
            }}
        >
            <span>
                <FaHeart />Remove from Favorites
            </span>
        </button>
    ) : (
        <button onClick={addToFavoriteHandler}>
            <span>
                <FaHeart />Add to Favorites
            </span>
        </button>
    );
    return (
        <Fragment>
            {isLoading && <Spinner />}
            <main id="main-content" className="main-content-container">
                {error &&
                    <h1>Error: {error.message}</h1>
                }
                {!isLoading && !error && (
                    <div className={classes.recipe__container}>
                        <div className={classes["recipe-image"]}>
                            <div className={classes["recipe-image__container"]}>
                                <img src={recipe.image} alt="" />
                            </div>
                        </div>
                        <div className={classes["recipe-details"]}>
                            <h1>{recipe.label}</h1>
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
                            <div className={classes["recipe-tag-group"]}>
                                {cuisineType}
                                {dishType}
                                {mealType}
                            </div>
                        </div>

                        <div className={classes["recipe__preparation"]}>
                            <div>
                                <img src={book} />
                            </div>
                            <h3>How to prepare?</h3>
                            <p>
                                View recipe details on <a href={recipe.url}>{recipe.source}</a>
                            </p>
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
                            <Link to={`/`}>
                                <span>
                                    <FaArrowLeft />Back to Search Recipes
                                </span>
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </Fragment>
    );
};

export default RecipeDetail;
