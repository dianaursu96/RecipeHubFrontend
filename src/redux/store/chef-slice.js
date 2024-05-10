import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drafts: [],
  currentDraft: {},
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
    initializeDraft(state, action) {
      state.currentDraft = { ...action.payload };
    },
  },
});
export const chefActions = chefSlice.actions;
export default chefSlice.reducer;
