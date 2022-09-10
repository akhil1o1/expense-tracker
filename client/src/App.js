import React from "react";
import { Box , Stack, Typography, Divider, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
import Navbar from "./components/Navbar";
import ExpenseInput from "./components/ExpenseInput";
import Expense from "./components/Expense";
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
    <Navbar/>
    <Box sx={{ display:"flex" , textAlign: "center", justifyContent:"center", pt:"30px", pb:"20px"}}>
      <Typography variant="h1" fontSize="35px" fontWeight="700">
        Keep track of your expenses
      </Typography>
    </Box>
    <Divider orientation="horizontal"/>
    <Stack pt="40px" pb="30px" 
    direction={{xs:"column", sm:"row"}} 
    spacing={{xs: 1, sm: 2, md: 4}} justifyContent="center" 
    divider={<Divider orientation="vertical" flexItem />}>
    <ExpenseInput label={"Expense"} icon={<ShoppingBagIcon/>}/>
    <ExpenseInput multiline={true} label={"Description"} icon={<DescriptionIcon/>}/>
    <ExpenseInput label={"Amount"} icon={<CurrencyRupeeIcon/>}/>
    <Button variant="outlined" color="secondary">Add Expense</Button>
    </Stack>
    <Divider orientation="horizontal"/>
    <Stack pt="30px" spacing={1} alignItems="center" justifyContent="center">
    <Expense/>
    <Expense/>
    <Expense/>
    </Stack>
    </ThemeProvider>
}

export default App;
