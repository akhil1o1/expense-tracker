import React,{useState, useEffect}from "react";
import { Box , Stack, Typography, Divider } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import Expense from "./components/Expense";
import Footer from "./components/Footer";
import ExpenseInputArea from "./components/ExpenseInputArea";
import ErrorAlert from "./components/ErrorAlert";
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

  const [showAlert, setShowAlert] = React.useState(false);
  const handleClose = () => {
    setShowAlert(false);
  };

  const [editExpense, setEditExpense] = useState(false);

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


  function handleChange(event) {
   const { name, value } = event.target;
    setNewExpense(prevNewExpense=>(
      {...prevNewExpense,
      [name] : value }
    ))
  };

  const addExpense = async (newExpense) => {
    const response = await fetch(`${APIbase}/expenses`, {
      method: "post",
      headers :{
        "Content-type" : "application/json"
      },
      body: JSON.stringify(newExpense)
    })
    .then(res=> res.json())
    .catch(err=> console.log(`Error : ${err}`));
    
    if(response.expense){
      setExpenses((prevExpenses)=>(
        [...prevExpenses, response]
      ))
    }else{
      setShowAlert(true);
    }
    setNewExpense({
      expense : "",
      description : "",
      amount : ""
    })
  };


  const deleteExpense = async (id) => {
      const response = await fetch(`${APIbase}/expense/delete/${id}`,
       {method:"delete"})
      .then((res)=> res.json())
      .catch((err)=> console.log(err));

      setExpenses((prevExpenses)=>{
        return prevExpenses.filter((expense)=> expense._id !== response._id)
      });
  };

  


  return <ThemeProvider theme={theme}>
    <Navbar/>
    <Box sx={{ display:"flex" , textAlign: "center", justifyContent:"center", pt:"30px", pb:"20px"}}>
      <Typography variant="h1" fontSize="35px" fontWeight="700" color="#9c27b0">
        Keep track of your expenses
      </Typography>
    </Box>
    <Divider orientation="horizontal"/>
    <ExpenseInputArea newExpense={newExpense} handleChange={handleChange} addExpense={addExpense}/>
    <Divider orientation="horizontal"/>
    <ErrorAlert showAlert={showAlert} handleClose={handleClose}/>
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
        deleteExpense={deleteExpense}
        />
      ))
    }
    </Stack>
    <Footer/>
    </ThemeProvider>
}

export default App;
