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
  popoverClasses,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { bgGradient, matBlack } from "../constants/color";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/styledComponent";
import AvatarCard from ".././components/shared/AvatarCard";
import { samplechats, sampleUsers } from "../constants/sampleData";
import UserItem from "../components/shared/UserItem";
import {
  useAddGroupMemberMutation,
  useChatDetailsQuery,
  useDeleteGroupMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);
import { useErrors } from "../hooks/hook";
import LayoutLoader from "../components/layout/Loaders";
import { use } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/misc";

const AddMembers = lazy(() => import("../components/dialogs/AddMembers"));
const Group = () => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);

  const [searchParams, setsearchParams] = useSearchParams();
  const chatId = searchParams.get("group");

  const myGroups = useMyGroupsQuery("");
  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );
  console.log(groupDetails);
  const [
    renameGroup,
    { isLoading: renameLoading, isError: renameisError, data },
  ] = useRenameGroupMutation();
  const [
    removeMember,
    { isError: removeMemberisError, isLoading: removeMemberisLoading },
  ] = useRemoveGroupMemberMutation();
  const [deleteGroup, { isLoading: deleteGroupisLoading }] =
    useDeleteGroupMutation();

  const navigate = useNavigate();

  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);

  const [isEdit, setisEdit] = useState(false);

  const [groupName, setgroupName] = useState("");
  const [groupNameUpdatedValue, setgroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setconfirmDeleteDialog] = useState(false);
  const [members, setMembers] = useState([]);

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];
  useErrors(errors);

  const navigateBack = () => {
    navigate("/");
  };
  const handleMobileClose = () => {
    setisMobileMenuOpen(false);
  };
  const handleMobile = () => {
    setisMobileMenuOpen((prev) => !prev);
  };
  const updateGroupName = async () => {
    setisEdit(false);
    try {
      const res = await renameGroup({ chatId, name: groupNameUpdatedValue });
      if (res.data) {
        // setgroupName(groupNameUpdatedValue);
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.error?.data?.message || "Something went Wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
    console.log(groupNameUpdatedValue);
  };
  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
    console.log("Add Groups ");
  };
  const removeMemberHandler = async (userId) => {
    console.log(userId);
    try {
      const res = await removeMember({ chatId, userId });
      console.log(res);
      if (res.data) {
        // setgroupName(groupNameUpdatedValue);
        toast.success(res?.data?.message);
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
  // Updated handler for closing the dialog
  const closeconfirmDeleteHandler = () => {
    setconfirmDeleteDialog(false);
  };

  const confirmDeleteHandler = () => {
    setconfirmDeleteDialog(true);
  };
  const deleteHandler = async () => {
    console.log("Deleting ");
    try {
      const res = await deleteGroup(chatId);
      console.log(res);
      if (res.data) {
        toast.success(res?.data?.message);
        setgroupName("");
        setgroupNameUpdatedValue("");
        setMembers([]);
        closeconfirmDeleteHandler();
        navigate("/groups"); // Navigate to groups list
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
    if (groupDetails.data) {
      setgroupName(groupDetails.data.chat.name);
      setgroupNameUpdatedValue(groupDetails.data.name);
      setMembers(groupDetails.data.chat.members);
    }
    return () => {
      setgroupName("");
      setgroupNameUpdatedValue("");
      setMembers([]);
      setisEdit(false);
    };
  }, [groupDetails.data]);

  // useEffect(() => {
  //   if (chatId) {
  //     setgroupName(`Group Name ${chatId}`);
  //     setgroupNameUpdatedValue(`Group Name ${chatId}`);
  //   }
  //   return () => {
  //     setgroupName("");
  //     setgroupNameUpdatedValue("");
  //     setisEdit(false);
  //   };
  // }, [chatId]);

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
          <IconButton onClick={updateGroupName} disabled={renameLoading}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setisEdit(true)} disabled={renameLoading}>
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
        Delete Group
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
        <GroupList myGroups={myGroups?.data?.message} chatId={chatId} />
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
              {deleteGroupisLoading ? (
                <CircularProgress />
              ) : (
                members.map((i) => (
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
                    handlerIsLoading={removeMemberisLoading}
                  />
                ))
              )}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>
      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMembers chatId={chatId} />
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
        <GroupList
          w={"50vw"}
          myGroups={myGroups?.data?.message}
          chatId={chatId}
        />
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
