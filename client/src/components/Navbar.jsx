import React from "react";
import {AppBar, Toolbar, Typography, IconButton} from "@mui/material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

function Navbar() {
    return <AppBar position="static" color="secondary">
    <Toolbar variant="dense">
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <AppRegistrationIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" component="div">
        Expense Tracker
      </Typography>
    </Toolbar>
  </AppBar>
}

export default Navbar;