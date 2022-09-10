import React,{useState, useEffect}from "react";
import { Box , Stack, Typography, Divider, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
import Navbar from "./components/Navbar";
import ExpenseInput from "./components/ExpenseInput";
import Expense from "./components/Expense";
import Footer from "./components/Footer";
import "./App.css";


const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins', `sans-serif`,
    ].join(','),
  },
});


function App() {

  const [ Expenses , setExpenses ] = useState([]);
  console.log(Expenses);

  const APIbase = "http://localhost:5000";

  useEffect(()=>{
    const fetchExpenses = async () =>{
      const response = await fetch(`${APIbase}/expenses`);
      const data = await response.json();
      setExpenses(data);
      console.log("use effect ran");
    }
    fetchExpenses();
  },[]);


  return <ThemeProvider theme={theme}>
    <Navbar/>
    <Box sx={{ display:"flex" , textAlign: "center", justifyContent:"center", pt:"30px", pb:"20px"}}>
      <Typography variant="h1" fontSize="35px" fontWeight="700" color="#9c27b0">
        Keep track of your expenses
      </Typography>
    </Box>
    <Divider orientation="horizontal"/>
    <Stack pt="40px" pb="30px" 
    direction={{xs:"column", sm:"row"}} 
    spacing={{xs: 1, sm: 2, md: 4}} justifyContent="center" 
    divider={<Divider orientation="vertical" flexItem />}>
    <ExpenseInput label={"Expense"} icon={<ShoppingBagIcon/>}/>
    <ExpenseInput label={"Description"} icon={<DescriptionIcon/>}/>
    <ExpenseInput label={"Amount"} icon={<CurrencyRupeeIcon/>}/>
    <Button variant="outlined" size="medium" color="secondary">Add Expense</Button>
    </Stack>
    <Divider orientation="horizontal"/>
    <Stack pt="30px" spacing={1} justifyContent="center" px="7%">
    {
      Expenses.map((item)=>(
        <Expense 
        key={item._id} 
        id={item._id} 
        expense={item.expense}
        description={item.description}
        amount={item.amount}
        date={item.date}
        />
      ))
    }
    </Stack>
    <Footer/>
    </ThemeProvider>
}

export default App;
