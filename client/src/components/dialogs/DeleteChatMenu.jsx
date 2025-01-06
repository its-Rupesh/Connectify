import { Menu, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc";
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  useDeleteGroupMutation,
  useLeaveGroupMutation,
} from "../../redux/api/api";
import { toast } from "react-hot-toast";
const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
  const { isDeleteMenu, selectDeleteChat } = useSelector((state) => state.misc);
  const isGroup = selectDeleteChat.groupchat;
  const chatId = selectDeleteChat.chatId;
  console.log(chatId);
  const [
    deleteGroup,
    {
      isError: deleteGroupisError,
      isSuccess: deleteGroupisSuccess,
      error: deleteGrouperror,
    },
  ] = useDeleteGroupMutation();
  const [
    leaveGroup,
    {
      isError: leaveGroupisError,
      isSuccess: leaveGroupisSuccess,
      error: leaveGrouperror,
    },
  ] = useLeaveGroupMutation();
  const navigate = useNavigate();
  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current = null;
  };
  const leaveGroupHandler = async () => {
    closeHandler();
    try {
      const res = await leaveGroup(chatId);
      console.log(res);
      if (res.data) {
        toast.success(res?.data?.message || "Chat Deleted Successfully");
      } else {
        toast.error(
          res?.error?.data?.message || "Something went Wrong with Server"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };
  const deletechatHandler = async () => {
    closeHandler();
    try {
      const res = await deleteGroup(chatId);
      if (res.data) {
        toast.success(res?.data?.message || "Chat Deleted Successfully");
      } else {
        toast.error(
          res?.error?.data?.message || "Something went Wrong with Server"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };
  useEffect(() => {
    if (deleteGroupisSuccess || leaveGroupisSuccess) {
      navigate("/");
    }
    if (leaveGroupisError || deleteGroupisError) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [
    navigate,
    deleteGroupisSuccess,
    leaveGroupisSuccess,
    deleteGroupisError,
    deleteGrouperror,
    leaveGroupisError,
    leaveGrouperror,
  ]);
  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor.current}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "center", horizontal: "center" }}
    >
      <Stack
        sx={{ width: "10rem", padding: "0.5rem", cursor: "pointer" }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={isGroup ? leaveGroupHandler : deletechatHandler}
      >
        {isGroup ? (
          <>
            <ExitToAppIcon />
            <Typography>Leave Group</Typography>
          </>
        ) : (
          <>
            <DeleteIcon />
            <Typography>Delete Chat</Typography>
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
