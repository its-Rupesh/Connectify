import React from "react";
import moment from "moment";
import AdminLayout from "../../components/layout/AdminLayout";
import { Container, Paper, Stack, Typography, Box } from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Widgets,
} from "@mui/icons-material";
import { SearchField } from "../../components/styles/styledComponent";
import { CurveButton } from "../../components/styles/styledComponent";

const Dashboard = () => {
  const AppBar = (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "2rem" }} />
        <SearchField placeholder="Search..." />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography display={{ xs: "none", lg: "block" }}>
          {moment().format(" Do MMM YYYY,h:mm:ss a")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );
  const Widgets = <Stack direction={{ xs: "column", sm: "row" }}></Stack>;
  return (
    <AdminLayout>
      <Container component={"main"}>
        {AppBar}
        <Stack direction={"row"} spacing={"2rem"} flexWrap={"wrap"}>
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
              height: "25rem",
            }}
          >
            <Typography>Last Messages</Typography>
            {"chat"}
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              width: "100%",
              maxWidth: "25rem",
              height: "25rem",
            }}
          >
            {"Dougnut Chart"}
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              height={"100%"}
            >
              <GroupIcon />
              <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};

export default Dashboard;
