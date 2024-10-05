import {
  Dialog,
  DialogTitle,
  InputAdornment,
  inputAdornmentClasses,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
const Search = () => {
  const search = useInputValidation("");
  return (
    <Dialog open>
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
      </Stack>
    </Dialog>
  );
};

export default Search;
