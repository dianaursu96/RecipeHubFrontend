import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  favourites: [],
  searchInput: "",
};
const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    initializeFavourites(state, action) {
      state.favourites = [...action.payload];
    },
    getSearchInput(state, action) {
      state.searchInput = action.payload;
    },
    searchRecipeData(state, action) {
      const searchedRecipe = action.payload.searchedRecipes;
      const favouriteRecipesIds = state.favourites;

      const transformedSearchRecipe = searchedRecipe.map((recipe) => {
        const isFavorite = favouriteRecipesIds.includes(recipe.id);
        return {
          ...recipe,
          isFavorite,
        };
      });

      state.recipes = transformedSearchRecipe;
    },
    // addToFavorites(state, action) {
    //   state.favourites = [...state.favourites, action.payload];
    // },
    // removeFromFavorites(state, action) {
    //   const recipeID = action.payload;
    //   const filteredFavorites = state.favourites.filter(
    //     (id) => id !== recipeID
    //   );
    //   state.favourites = filteredFavorites;
    // },
  },
});
export const recipeActions = recipeSlice.actions;
export default recipeSlice.reducer;
