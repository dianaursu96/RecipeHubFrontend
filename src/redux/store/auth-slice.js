const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  uid: null,
  token: null,
  firstName: "",
  lastName: "",
  email: "",
  role: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.uid = action.payload.uid;
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    logout(state) {
      localStorage.removeItem("userData");
      state.uid = null;
      state.token = null;
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.role = "";
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
