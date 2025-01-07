import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { server } from "../../constants/config";
import { AdminExist } from "../../redux/reducers/auth";
import { useGetAdminQuery } from "../../redux/api/api";
import { useEffect } from "react";
const AdminLogin = () => {
  const dispatch = useDispatch();
  const { data } = useGetAdminQuery();
  console.log(data);

  useEffect(() => {
    if (data && data.admin !== undefined) {
      dispatch(AdminExist()); // Update Redux state
    }
  }, [data, dispatch]);

  const secretKey = useInputValidation("");

  const { isAdmin } = useSelector((state) => state.auth);
  if (isAdmin == true) return <Navigate to={"/admin/dashboard"} />;

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(secretKey.value);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/admin/verify`,
        {
          secretKey: secretKey.value,
        },
        config
      );
      console.log(data);
      dispatch(AdminExist());
      toast.success(data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something Went Wrong in Server"
      );
    }
  };
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(200, 200, 200, 0.5), rgba(120, 110, 220, 0.5))",
        height: "100vh",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            style={{ width: "100%", marginTop: "1rem" }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Secret-Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />
            <Button
              sx={{ marginTop: "1rem" }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
