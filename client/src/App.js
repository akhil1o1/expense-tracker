import React from "react";
import { Box , Stack, TextField, Typography, Divider, AppBar, Toolbar, IconButton } from "@mui/material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";


const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins', `sans-serif`,
    ].join(','),
  },
});


function App() {
  return <ThemeProvider theme={theme}>
  <AppBar position="static" color="secondary">
  <Toolbar variant="dense">
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
      <AppRegistrationIcon />
    </IconButton>
    <Typography variant="h6" color="inherit" component="div">
      Expense Tracker
    </Typography>
  </Toolbar>
</AppBar>
    <Box sx={{ display:"flex" , textAlign: "center", justifyContent:"center", pt:"30px", pb:"20px"}}>
      <Typography variant="h1" fontSize="35px" fontWeight="700">
        Keep track of your expenses
      </Typography>
    </Box>
    <Divider orientation="horizontal"/>
    <Stack direction={{xs:"column", sm:"row"}} spacing={{xs: 1, sm: 2, md: 4}}>
    

    </Stack>
  
    </ThemeProvider>
}

export default App;
