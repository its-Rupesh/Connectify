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
import { NEW_MESSAGE } from "../constants/event";
import { useChatDetailsQuery } from "../redux/api/api";
import { Drawer, Grid, Skeleton } from "@mui/material";
import { useSocketEvents } from "../hooks/hook";

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);

  const socket = getSocket();
  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const members = chatDetails?.data?.chat?.members;
  const [messages, setmessage] = useState("");
  const [Show_message, setShow_message] = useState([]);
  console.log(Show_message);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!messages.trim()) return;
    //Emitting Message to Server
    socket.emit(NEW_MESSAGE, { chatId, members, messages });
    setmessage("");
  };

  const newMessagesHandler = useCallback((data) => {
    // console.log(data);
    setShow_message((prev) => [...prev, data.message]);
  }, []);
  const eventHandler = { [NEW_MESSAGE]: newMessagesHandler };
  useSocketEvents(socket, eventHandler);

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
        {Show_message.map((i) => (
          <MessageComponent message={i} user={user} key={i._id} />
        ))}
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
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="Enter Your Text Here...."
            value={messages}
            onChange={(e) => setmessage(e.target.value)}
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
      <FileMenu />
    </>
  );
};

export default AppLayout()(Chat);
