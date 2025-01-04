import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers as users } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";
const NewGroups = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, { isLoading: fetchingData }] = useNewGroupMutation();

  const groupName = useInputValidation("");
  // const [members, setMembers] = useState(users);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors([errors]);

  // prev matlab current elemrrnt(All arrays)
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i != id) : [...prev, id]
    );
  };
  const submitHandler = async () => {
    if (!groupName.value) return toast.error("Group name is Required");
    if (selectedMembers.length < 2)
      return toast.error("Please Select atleast 2 Members");
    console.log(groupName.value, selectedMembers);
    // Creating Groups
    try {
      const res = await newGroup({
        name: groupName.value,
        members: selectedMembers,
      });
      console.log("res", res);
      if (res.data) {
        toast.success(res.data.message || "Group Created!!..");
      } else {
        toast.error(res?.error?.data?.message || "Something went Wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle alignItems={"center"} variant="h4">
          New Group
        </DialogTitle>
        <TextField
          label="group name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          )}
        </Stack>
        <Stack direction={"row"} justifyContent="space-evenly">
          <Button
            variant="text"
            color="error"
            size={"large"}
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={fetchingData}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroups;
