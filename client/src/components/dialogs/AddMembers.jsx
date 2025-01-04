import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import {
  useAddGroupMemberMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useErrors } from "../../hooks/hook";
import { setIsAddMember } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const AddMembers = ({ chatId }) => {
  const dispatch = useDispatch();

  const { isError, error, isLoading, data } = useAvailableFriendsQuery(chatId);
  console.log(data);
  const [
    addMembers,
    { isError: addMemberisError, isLoading: addMembersisLoading },
  ] = useAddGroupMemberMutation();

  const { isAddMember } = useSelector((state) => state.misc);

  const [selectedMembers, setSelectedMembers] = useState([]);

  // prev matlab current elemrrnt(All arrays)
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i != id) : [...prev, id]
    );
  };

  const addMemberSubmitHandler = async () => {
    console.log(selectedMembers);
    try {
      const res = await addMembers({ chatId, members: selectedMembers });
      if (res.data) {
        toast.success(res.data.message || "Member Added Successafully");
        console.log(res);
      } else {
        toast.error(
          res.error.data.message || "Something Went Wrong with Server"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Error at Code...");
    }
    closeHandler();
  };
  const closeHandler = () => {
    setSelectedMembers([]);
    dispatch(setIsAddMember(false));
  };

  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack width={"20rem"} p={"2rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Members</DialogTitle>
        <Stack spacing={"1rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.availableFriends?.length > 0 ? (
            data?.availableFriends?.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
                handlerIsLoading={addMembersisLoading}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={addMembersisLoading}
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMembers;
