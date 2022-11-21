import React from "react";
import { TextField, InputAdornment } from "@mui/material";

function ExpenseInput({ value, handleChange, label, icon, name }) {
  return (
    <TextField
      name={name}
      size="small"
      id="outlined-basic"
      label={label}
      variant="outlined"
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
    />
  );
}

export default ExpenseInput;
