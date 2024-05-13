const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  id: null,
  token: null,
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  favourites: [],
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateProfile(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    login(state, action) {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.favourites = action.payload.favourites;
    },
    logout(state) {
      localStorage.removeItem("userData");
      state.id = null;
      state.token = null;
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.role = "";
      state.favourites = [];
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
