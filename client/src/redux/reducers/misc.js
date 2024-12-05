import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewGroup: false,
  isAddMember: false,
  isNotification: false,
  isMobile: false,
  isSearch: false,
  isFileMenu: false,
  isDeleteMenu: false,
  uploadingLoader: false,
  selectDeleteChat: {
    chatId: "",
    groupChat: false,
  },
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setIsNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
    setIsAddMember: (state, action) => {
      state.isAddMember = action.payload;
    },
    setIsNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    setisMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setIsFileMenu: (state, action) => {
      state.isFileMenu = action.payload;
    },
    setIsDeleteMenu: (state, action) => {
      state.isDeleteMenu = action.payload;
    },
    setIsuploadingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    setSelectDeleteChat: (state, action) => {
      state.selectDeleteChat = action.payload;
    },
  },
});
export const {
  setIsNewGroup,
  setIsAddMember,
  setIsNotification,
  setisMobile,
  setIsSearch,
  setIsFileMenu,
  setIsDeleteMenu,
  setIsuploadingLoader,
  setSelectDeleteChat,
} = miscSlice.actions;
export default miscSlice;
