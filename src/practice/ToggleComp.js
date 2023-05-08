import { InputAdornment, Stack, TextField } from "@mui/material";
import React from "react";

const ToggleComp = () => {
  return (
    <Stack spacing={4}>
      <Stack direction="row">
        <TextField label="name" />
        <TextField label="Name" variant="outlined" required></TextField>
        <TextField
          label="amount"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          helperText="write the amount"
        ></TextField>
      </Stack>
    </Stack>
  );
};

export default ToggleComp;
