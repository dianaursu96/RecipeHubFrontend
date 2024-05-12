import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alertMessage: "",
  hasError: false,
  alertOpen: false,
};
const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    closeAlert(state) {
      state.alertOpen = false;
    },
    setSuccessMessage(state, action) {
      state.alertMessage = action.payload;
      state.alertOpen = true;
      state.hasError = false;
    },
    setErrorMessage(state, action) {
      state.alertMessage = action.payload;
      state.alertOpen = true;
      state.hasError = true;
    },
  },
});
export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
