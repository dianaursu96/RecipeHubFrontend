import { configureStore } from "@reduxjs/toolkit";
import readerReducer from "./reader-slice";
import chefReducer from "./chef-slice";
import authReducer from "./auth-slice";
import alertReducer from "./alert-slice";
const store = configureStore({
  reducer: {
    reader: readerReducer,
    auth: authReducer,
    chef: chefReducer,
    alert: alertReducer,
  },
});

export default store;
