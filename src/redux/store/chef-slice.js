import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drafts: [],
};
const chefSlice = createSlice({
  name: "chef",
  initialState,
  reducers: {
    initializeRecipes(state, action) {
      state.drafts = [...action.payload];
    },
    addNewDraft(state, action) {
      state.drafts = [...state.drafts, action.payload];
    },
  },
});
export const chefActions = chefSlice.actions;
export default chefSlice.reducer;
