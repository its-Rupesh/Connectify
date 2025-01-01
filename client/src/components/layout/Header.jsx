import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationIcon,
} from "@mui/icons-material";
import React, { Suspense, useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { orange } from "../../constants/color";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExist } from "../../redux/reducers/auth";
import {
  setisMobile,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificaionDialog = lazy(() => import("../specific/Notificaions"));
const NewGroupsDialog = lazy(() => import("../specific/NewGroups"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSearch, isNotification } = useSelector((state) => state.misc);
  const { notificationCount } = useSelector((state) => state.chat);
  const [isNewGroup, setIsNewGroup] = useState(false);

  const handleMobile = () => {
    dispatch(setisMobile(true));
  };
  const openSearch = () => {
    dispatch(setIsSearch(true));
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };
  const LogoutHandler = async () => {
    try {
      console.log("logout");
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      dispatch(userNotExist());
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong in logout Handler"
      );
    }
  };
  const NavigateToGroup = () => navigate("/groups");
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "home", sm: "block" } }}
            >
              Connectify
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon />}
                onClick={NavigateToGroup}
              />
              <IconBtn
                title={"Notifications"}
                icon={<NotificationIcon />}
                onClick={openNotification}
                value={notificationCount}
              />
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={LogoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificaionDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupsDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
