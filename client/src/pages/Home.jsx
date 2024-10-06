import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box bgcolor={"whitesmoke"} height={"100%"}>
      <Typography variant="h5" p="2rem" textAlign={"center"}>
        Select a Friend To Chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
