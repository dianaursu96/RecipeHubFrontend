import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  favourites: [],
  searchInput: "",
  currentCategory: "",
};
const readerSlice = createSlice({
  name: "reader",
  initialState,
  reducers: {
    initializeFavourites(state, action) {
      state.favourites = [...action.payload];
    },
    setSearchInput(state, action) {
      state.searchInput = action.payload;
    },
    setCurrentCategory(state, action) {
      state.currentCategory = action.payload;
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
  },
});
export const readerActions = readerSlice.actions;
export default readerSlice.reducer;
