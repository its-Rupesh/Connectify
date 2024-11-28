import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
const store = configureStore({
  reducer: {
    reducer: {
      //  Reducer name
      [authSlice.name]: authSlice.reducer,
    },
  },
});
export default store;
