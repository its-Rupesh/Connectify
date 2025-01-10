import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USER,
  REFETCH_CHATS,
} from "../../constants/event";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { getOrSaveFromStorage } from "../../lib/feature";
import { useMyChatsQuery } from "../../redux/api/api";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import {
  setIsDeleteMenu,
  setisMobile,
  setSelectDeleteChat,
} from "../../redux/reducers/misc";
import { getSocket } from "../../socket";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import { Profile } from "../specific/Profile";
import Header from "./Header";
import DeleteChatMenu from "../dialogs/DeleteChatMenu";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    // alag Chats select Karne ke liye
    const params = useParams();
    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);

    const [onlineUsers, setonlineUsers] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const socket = getSocket();

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessageAlert } = useSelector((state) => state.chat);

    const { isError, isLoading, error, refetch, data } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessageAlert });
    }, [newMessageAlert]);

    const handleMobileClose = () => {
      dispatch(setisMobile(false));
    };

    const handleDeleteChat = (e, chatId, groupchat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectDeleteChat({ chatId, groupchat }));
      deleteMenuAnchor.current = e.currentTarget;
    };
    const newMessageAlertListner = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );
    const newRequestListner = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListner = useCallback(() => {
      // dispatch(incrementNotification());
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUserListner = useCallback((data) => {
      console.log("online_data", data);
      setonlineUsers(data);
    }, []);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]: newMessageAlertListner,
      [NEW_REQUEST]: newRequestListner,
      [REFETCH_CHATS]: refetchListner,
      [ONLINE_USER]: onlineUserListner,
    };
    useSocketEvents(socket, eventHandlers);

    return (
      <>
        <Title />
        <Header />
        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.message}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessageAlert}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.message}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessageAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
