import {
  Dialog,
  DialogTitle,
  InputAdornment,
  inputAdornmentClasses,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";

const Search = () => {
  const dispatch = useDispatch();
  const { isSearch } = useSelector((state) => state.misc);
  const search = useInputValidation("");

  let isLoadingSendFriendRequest = false;

  const addFriendHandler = (id) => {
    console.log(id);
  };

  const [users, setusers] = useState(sampleUsers);
  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };
  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack
        p={"2rem"}
        spacing={"2rem"}
        width={"25rem"}
        direction={"column"}
        alignItems={"center"}
      >
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
