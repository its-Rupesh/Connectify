import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
const AddMembers = ({ addMembers, isLoadingAddMembers, ChatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  // prev matlab current elemrrnt(All arrays)
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i != id) : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    closeHandler();
  };
  const closeHandler = () => {
    setSelectedMembers([]);
    setMembers([]);
  };

  return (
    <Dialog open onClose={closeHandler}>
      <Stack width={"20rem"} p={"2rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Members</DialogTitle>
        <Stack spacing={"1rem"}>
          {members.length > 0 ? (
            members.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
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
            disabled={isLoadingAddMembers}
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMembers;
