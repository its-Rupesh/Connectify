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
import React, { useEffect, useState } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import { toast } from "react-hot-toast";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";

const Search = () => {
  const dispatch = useDispatch();
  const { isSearch } = useSelector((state) => state.misc);
  // [Trigger Funcn ,{isLoading,iserror,error...}]
  const [searchUser, result] = useLazySearchUserQuery();
  // const [sendFriendRequest] = useSendFriendRequestMutation();
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };
  const search = useInputValidation("");
  let isLoadingSendFriendRequest = false;

  const addFriendHandler = async (id) => {
    try {
      const res = await sendFriendRequest({ userId: id });
      if (res.data) {
        toast.success("Friend Request Sent");
      } else {
        toast.error(res?.error?.data?.message || "Something went Wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };
  const [users, setusers] = useState([]);

  useEffect(() => {
    const timeOutId = setTimeout(async () => {
      const user = await searchUser(search.value);
      const show_user = user.data.message;
      console.log(show_user);
      setusers(show_user);
    }, 1000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);

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
