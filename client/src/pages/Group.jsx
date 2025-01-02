import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
  Padding,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Backdrop,
} from "@mui/material";
import { bgGradient, matBlack } from "../constants/color";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/styledComponent";
import AvatarCard from ".././components/shared/AvatarCard";
import { samplechats, sampleUsers } from "../constants/sampleData";
import UserItem from "../components/shared/UserItem";
import { useMyGroupsQuery } from "../redux/api/api";
const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
import { useErrors } from "../hooks/hook";
import LayoutLoader from "../components/layout/Loaders";

const AddMembers = lazy(() => import("../components/dialogs/AddMembers"));
const isAddMember = false;
const Group = () => {
  const myGroups = useMyGroupsQuery("");

  const [searchParams, setsearchParams] = useSearchParams();
  const Id = searchParams.get("group");
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
  const handleMobileClose = () => {
    setisMobileMenuOpen(false);
  };
  const [isEdit, setisEdit] = useState(false);
  const updateGroupName = () => {
    setisEdit(false);
    console.log(groupNameUpdatedValue);
  };
  const [groupName, setgroupName] = useState("");
  const [groupNameUpdatedValue, setgroupNameUpdatedValue] = useState("");
  const handleMobile = () => {
    setisMobileMenuOpen((prev) => !prev);
  };
  const [confirmDeleteDialog, setconfirmDeleteDialog] = useState(false);

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
  ];
  useErrors(errors);

  // Updated handler for closing the dialog
  const closeconfirmDeleteHandler = () => {
    setconfirmDeleteDialog(false);
  };

  const confirmDeleteHandler = () => {
    setconfirmDeleteDialog(true);
    console.log("Delete Groups");
  };
  const openAddMemberHandler = () => {
    console.log("Add Groups");
  };

  const deleteHandler = () => {
    console.log("delete Handler");
    closeconfirmDeleteHandler();
  };

  const removeMemberHandler = (_id) => {
    console.log("Remove Handler", _id);
  };

  useEffect(() => {
    if (Id) {
      setgroupName(`Group Name ${Id}`);
      setgroupNameUpdatedValue(`Group Name ${Id}`);
    }
    return () => {
      setgroupName("");
      setgroupNameUpdatedValue("");
      setisEdit(false);
    };
  }, [Id]);

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <Tooltip title="Menu">
          <IconButton onClick={handleMobile}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setgroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setisEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{ xs: "column-reverse", sm: "row" }}
      spacing={"1rem"}
      p={{ xs: "0", sm: "1rem", md: "1rem 4rem" }}
    >
      <Button
        size="large"
        color="error"
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={confirmDeleteHandler}
      >
        Delete Members
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Members
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        sm={4}
      >
        <GroupList myGroups={samplechats} chatId={Id} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
        {groupName && (
          <>
            {GroupName}
            <Typography>Members</Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{ sm: "1rem", xs: "0", md: "1rem 4rem" }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {/*Members*/}
              {sampleUsers.map((i) => (
                <UserItem
                  user={i}
                  isAdded
                  key={i._id}
                  styling={{
                    boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>
      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMembers />
        </Suspense>
      )}
      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeconfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}
      <Drawer
        sx={{
          display: { xs: "block", sm: "none" },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupList w={"50vw"} myGroups={samplechats} chatId={Id} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack width={w} sx={{ backgroundImage: bgGradient, height: "100vh" }}>
      {myGroups.length > 0 ? (
        myGroups.map((i) => (
          <GroupListItem group={i} chatId={chatId} key={i._id} />
        ))
      ) : (
        <Typography textAlign={"center"} padding={"1rem"}>
          No Groups
        </Typography>
      )}
    </Stack>
  );
};

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Group;
