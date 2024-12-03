import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api/api";
const store = configureStore({
  reducer: {
    //  Reducer name
    [authSlice.name]: authSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (defaultMiddlerware) => [...defaultMiddlerware(), api.middleware],
});
export default store;
