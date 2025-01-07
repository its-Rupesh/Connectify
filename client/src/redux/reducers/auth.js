import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAdmin: false,
  loader: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExist: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExist: (state) => {
      state.user = null;
      state.loader = false;
    },
    AdminExist: (state, action) => {
      state.isAdmin = true;
    },
    AdminNotExist: (state) => {
      state.isAdmin = false;
    },
  },
});
export const { userExist, userNotExist, AdminExist, AdminNotExist } =
  authSlice.actions;
export default authSlice;
