import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/feature";
import { NEW_MESSAGE_ALERT } from "../../constants/event";

const initialState = {
  notificationCount: 0,
  newMessageAlert: getOrSaveFromStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) || [
    {
      chatId: "",
      count: 0,
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotification: (state) => {
      state.notificationCount = state.notificationCount + 1;
    },
    resetNotificationCount: (state) => {
      state.notificationCount = 0;
    },
    setNewMessagesAlert: (state, action) => {
      const index = state.newMessageAlert.findIndex(
        (item) => item.chatId === action.payload.chatId
      );
      if (index != -1) {
        state.newMessageAlert[index].count =
          state.newMessageAlert[index].count + 1;
      } else {
        state.newMessageAlert.push({ chatId: action.payload.chatId, count: 1 });
      }
    },
    removeNewMessageAlert: (state, action) => {
      state.newMessageAlert = state.newMessageAlert.filter(
        (item) => item.chatId !== action.payload
      );
    },
  },
});
export const {
  incrementNotification,
  resetNotificationCount,
  setNewMessagesAlert,
  removeNewMessageAlert,
} = chatSlice.actions;
export default chatSlice;
