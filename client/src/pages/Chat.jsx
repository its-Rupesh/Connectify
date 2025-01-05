import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import { InputBox } from "../components/styles/styledComponent";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import {
  ALERT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/event";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { Drawer, Grid, Skeleton } from "@mui/material";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollBottom, useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessageAlert } from "../redux/reducers/chat";
import { use } from "react";
import TypingMessageLoader from "../components/layout/TypingMessage";
import { useNavigate } from "react-router-dom";

const Chat = ({ chatId, user }) => {
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);
  const bottomRef = useRef(null);

  const [messages, setmessage] = useState("");
  const [page, setpage] = useState(1);
  const [Show_message, setShow_message] = useState([]);
  const [fileMenuanchor, setfileMenuanchor] = useState(null);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);

  const typingTimeOut = useRef(null);
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const errors = [
    { isError: chatDetails?.isError, error: chatDetails.error },
    { isError: oldMessagesChunk?.isError, error: oldMessagesChunk.error },
  ];
  const members = chatDetails?.data?.chat?.members;

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk?.data?.totalPages,
    page,
    setpage,
    oldMessagesChunk.data?.messages
  );
  // console.log("oldMessages", oldMessages);

  // Unmount all Chat data when user change the chat list or to change whom to chat
  useEffect(() => {
    dispatch(removeNewMessageAlert(chatId));
    return () => {
      setmessage("");
      setpage(1);
      setShow_message([]);
      setOldMessages([]);
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [Show_message]);

  useEffect(() => {
    if (!chatDetails?.data?.chat) {
      return navigate("/");
    }
  }, [chatDetails.data]);

  // For user to show another user is writing
  const messageOnChangeHandler = (e) => {
    setmessage(e.target.value);
    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }
    if (typingTimeOut.current) clearTimeout(typingTimeOut.current);
    typingTimeOut.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, 2000);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messages.trim()) return;
    //Emitting Message to Server
    socket.emit(NEW_MESSAGE, { chatId, members, messages });
    setmessage("");
  };

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setShow_message((prev) => [...prev, data.message]);
    },
    [chatId]
  );
  const startTypingListner = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      console.log("Typing", data);
      setUserTyping(true);
    },
    [chatId]
  );
  const stopTypingListner = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      console.log("Stop Typing", data);
      setUserTyping(false);
    },
    [chatId]
  );
  const alertListener = useCallback(
    (content) => {
      const messageForAlert = {
        content,
        sender: {
          _id: "1",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };
      setShow_message((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );
  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListner,
    [STOP_TYPING]: stopTypingListner,
  };

  useSocketEvents(socket, eventHandler);

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setfileMenuanchor(e.currentTarget);
  };

  useErrors(errors);
  const allMessages = [...oldMessages, ...Show_message];
  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"whitesmoke"}
        height={"90%"}
        sx={{ overflowX: "hidden", overflowY: "auto" }}
      >
        {allMessages.map((i) => (
          <MessageComponent message={i} user={user} key={i._id} />
        ))}
        {userTyping && <TypingMessageLoader />}
        <div ref={bottomRef} />
      </Stack>
      <form style={{ height: "10%" }} onSubmit={submitHandler}>
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{ position: "absolute", left: "1.5rem", rotate: "30deg" }}
            ref={fileMenuRef}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Enter Your Text Here...."
            value={messages}
            onChange={messageOnChangeHandler}
          />
          <IconButton
            sx={{
              rotate: "-30deg",
              backgroundColor: "#ea7070",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": { bgcolor: "error.dark" },
            }}
            type="submit"
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorEl={fileMenuanchor} chatId={chatId} />
    </>
  );
};

export default AppLayout()(Chat);
