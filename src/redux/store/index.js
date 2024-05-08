import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipe-slice";
import authReducer from "./auth-slice";
const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    auth: authReducer,
  },
});

export default store;
