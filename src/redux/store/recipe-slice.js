import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  favorites: [],
  searchInput: "",
};
const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    resetFavoriteRecipes(state, action) {
      state.favorites = [...action.payload];
    },
    getSearchInput(state, action) {
      state.searchInput = action.payload;
    },
    searchRecipeData(state, action) {
      const searchedRecipe = action.payload.searchedRecipes;
      const favoriteRecipes = current(state.favorites);

      // if match: create new property (isfavorite) to that object and include the recipe ID created from DB
      let transformedSearchRecipe = searchedRecipe.map((recipe) => {
        if (favoriteRecipes.includes(recipe.id)) {
          return { ...recipe, isFavorite: true };
        } else {
          return recipe;
        }
      });
      // save the transformed recipe and favorite recipes to state
      state.recipes = transformedSearchRecipe;
    },
    addToFavorites(state, action) {
      console.log(action.payload);
      state.favorites = [...state.favorites, action.payload];
    },
    removeFromFavorites(state, action) {
      console.log(action.payload);
      const recipeID = action.payload;
      const filteredFavorites = state.favorites.filter(
        (favorite) => favorite.id !== recipeID
      );
      state.favorites = filteredFavorites;
    },
  },
});
export const recipeActions = recipeSlice.actions;
export default recipeSlice.reducer;
