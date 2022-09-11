import React,{useState, useEffect}from "react";
import { Box , Stack, Typography, Divider } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import Expense from "./components/Expense";
import Footer from "./components/Footer";
import ExpenseInputArea from "./components/ExpenseInputArea";
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
  const [ newExpense, setNewExpense ] = useState({
    expense : "",
    description : "",
    amount : ""
  })
  console.log(newExpense);


  function handleChange(event) {
   const { name, value } = event.target;
    setNewExpense(prevExpense=>(
      {...prevExpense,
      [name] : value }
    ))
  };

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
    <ExpenseInputArea newExpense={newExpense} handleChange={handleChange}/>
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
