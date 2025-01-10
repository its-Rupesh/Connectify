import { Button, Container, Stack, Typography } from "@mui/material";
import { Error as ErrorIcon } from "@mui/icons-material";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
const NotFound = () => {
  const naviagate = useNavigate();
  const returntoHomepage = () => {
    naviagate("/");
  };
  return (
    <Container maxWidth="lg" sx={{ height: "100vh" }}>
      <Stack
        alignItems={"center"}
        spacing={"2rem"}
        justifyContent={"center"}
        height="100%"
      >
        <ErrorIcon sx={{ fontSize: "8rem" }} />
        <Typography variant="h1">404</Typography>
        <Typography variant="h2">Not Found</Typography>
        <Button onClick={returntoHomepage}>Go Back To Homepage</Button>
      </Stack>
    </Container>
  );
};

export default NotFound;
