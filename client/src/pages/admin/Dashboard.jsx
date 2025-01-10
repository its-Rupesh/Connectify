import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Avatar,
  Box,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  NotificationAdd,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/styledComponent";
import { LineChart, DoughnutChart } from "../../components/specific/Chart";
import { useAdminStatsQuery } from "../../redux/api/api";
import LayoutLoader from "../../components/layout/Loaders";
import { useErrors } from "../../hooks/hook";
import { useFetchData } from "6pp";
import { server } from "../../constants/config";
const DashBoard = () => {
  const {
    loading: isLoading,
    data,
    error,
  } = useFetchData(`${server}/api/v1/admin/stats`, "dashboard-stats");
  useErrors([{ isError: error, error: error }]);
  console.log(data);
  const Appbar = (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
        <SearchField placeholder="Type...." />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography display={{ xs: "none", lg: "block" }}>
          {moment().format("MMMM Do YYYY,h:mm a")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );
  const Widget = ({ title, value, Icon }) => (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1.5rem",
        width: "20rem",
      }}
    >
      <Stack alignItems={"center"} spacing={"1rem"}>
        <Typography
          sx={{
            color: "rgba(0,0,0,0.7)",
            borderRadius: "50%",
            border: `5px solid rgba(0,0,0,0.9)`,
            width: "5rem",
            height: "5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {value}
        </Typography>
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          {Icon}
          <Typography>{title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
  const Widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget
        title={"Users"}
        value={data?.message?.userCount}
        Icon={<PersonIcon />}
      />
      <Widget
        title={"Chats"}
        value={data?.message?.totalChatscount}
        Icon={<GroupIcon />}
      />
      <Widget
        title={"Messages"}
        value={data?.message?.messageCount}
        Icon={<MessageIcon />}
      />
    </Stack>
  );
  return isLoading ? (
    <LayoutLoader />
  ) : (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}
        <Stack
          direction={{ xs: "column", lg: "row" }}
          flexWrap={"wrap"}
          justifyContent={"center"} //changed
          alignItems={{ xs: "center", lg: "stretch" }}
          sx={{ gap: "2rem" }}
        >
          <Paper
            elevation={3}
            sx={{
              flex: "1 1 45%", // Allows the container to take up 45% width and wrap when needed
              minWidth: "20rem", // Minimum width to ensure readability on smaller screens
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
            }}
          >
            <Typography margin={"2rem 0"} variant="h4">
              Last Messages
            </Typography>
            <LineChart value={data?.message?.messageChart} />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: { xs: "100%", sm: "50%" },
              width: "100%",
              maxWidth: "25rem",
            }}
          >
            <DoughnutChart
              labels={["Single Chats", "Group Chats"]}
              value={[
                data?.message?.totalChatscount - data?.message?.groupsCount,
                data?.message?.groupsCount,
              ]}
            />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
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

export default DashBoard;
