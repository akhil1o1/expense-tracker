import React from "react";
import { TextField, InputAdornment} from "@mui/material";


function ExpenseInput(props) {
    return <TextField size="small" id="outlined-basic" label={props.label} variant="outlined"
    InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {props.icon}
            </InputAdornment>
          ),
        }} />
}

export default ExpenseInput;