import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  ManageAccounts as ManageAccountsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  ExitToApp as ExitToappIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import { grayColor, matBlack } from "../../constants/color";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

export const adminTabs = [
  { name: "DashBoard", path: "/admin/dashboard", icon: <DashboardIcon /> },
  { name: "Users", path: "/admin/users", icon: <ManageAccountsIcon /> },
  { name: "Chats", path: "/admin/chats", icon: <GroupIcon /> },
  { name: "Messages", path: "/admin/messages", icon: <MessageIcon /> },
];

const SideBar = ({ w = "100%" }) => {
  const location = useLocation();
  const logoutHandler = () => {};

  return (
    <Stack width={w} spacing={"3rem"} direction={"column"} p={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        Conectify
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                bgcolor: matBlack,
                color: "white",
                ":hover": { color: "white" },
              }
            }
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={"1rem"}
              p={"1rem"}
            >
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={logoutHandler}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={"1rem"}
            p={"1rem"}
          >
            <ExitToappIcon />
            <Typography>LogOut</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};
const isAdmin = true;
const AdminLayout = ({ children }) => {
  const [isMobile, setisMobile] = useState(false);
  const handleMobile = () => {
    setisMobile(!isMobile);
    console.log("Menu", isMobile);
  };
  const handleClose = () => {
    setisMobile(false);
  };
  if (!isAdmin) return <Navigate to="/admin" />;
  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <SideBar />
      </Grid>
      <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: grayColor }}>
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <SideBar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
