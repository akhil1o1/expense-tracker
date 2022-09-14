import React,{useState, useEffect}from "react";
import { Box , Stack, Typography, Divider } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CircularProgress from '@mui/material/CircularProgress'
import Navbar from "./components/Navbar";
import Expense from "./components/Expense";
import Footer from "./components/Footer";
import ExpenseInputArea from "./components/ExpenseInputArea";
import ErrorAlert from "./components/ErrorAlert";
import "./App.css";


const theme = createTheme({ //applying font-family
  typography: {
    fontFamily: [
      'Poppins', `sans-serif`,
    ].join(','),
  },
});


function App() {

  const [ expenses , setExpenses ] = useState([]);
  console.log(expenses);
  const [ newExpense, setNewExpense ] = useState({
    expense : "",
    description : "",
    amount : ""
  })
  console.log(`newExpense : ${newExpense}`);

  const [showAlert, setShowAlert] = useState(false);
  const handleClose = () => {
    setShowAlert(false);
  };

  const [editExpenseId, setEditExpenseId] = useState("");
  console.log(`editExpenseId ${editExpenseId}`);
 

  const APIbase = "http://localhost:5000";

  // to get all expenses on first load
  useEffect(()=>{
    const fetchExpenses = async () =>{
      const response = await fetch(`${APIbase}/expenses`);
      const data = await response.json();
      const sortedData = data.sort((a,b)=>{ //sorting by newest date
        return new Date(b.date) - new Date(a.date)
      });
      setExpenses(sortedData);
      console.log("use effect ran");
    }
    fetchExpenses();
  },[]);


  // to add new expense
  const addExpense = async (newExpense) => {
    const response = await fetch(`${APIbase}/expenses`, {
      method: "POST",
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


  //onclick handler for edit button inside Expense.jsx
  function handleEditClick (id){
    console.log(`id : ${id}`);
    setEditExpenseId(id);
    const filterArray = expenses.filter((expense)=> expense._id===id);
    const [ editExpense ] = filterArray;
    setNewExpense(editExpense);
  };

  // save edited response
  const saveEditedExpense = async (editedExpense) => {
    console.log(`edited Expense : ${editedExpense}`);
    const id = editedExpense._id;
    const response = await fetch(`${APIbase}/expenses/edit/${id}`, {
      method: "PATCH",
      headers : {
        "Content-type" : "application/json"
      },
      body : JSON.stringify(editedExpense)
    })
    .then((response)=> response.json())
    .catch((err)=> console.log(`Error : ${err}`));

    console.log(response);

    setExpenses((prevExpenses)=> {
      const newExpenses = prevExpenses.filter((expense)=> expense._id!==response._id);
      return [...newExpenses, response];
    });

    setEditExpenseId("");
    setNewExpense({
      expense : "",
      description : "",
      amount : ""
    });
  }

  
  // delete a expense
  const deleteExpense = async (id) => {
      const response = await fetch(`${APIbase}/expenses/delete/${id}`,
       {method:"DELETE"})
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
    <ExpenseInputArea newExpense={newExpense} 
     setNewExpense={setNewExpense} 
     addExpense={addExpense}
     expenses={expenses}
     editExpenseId={editExpenseId}
     saveEditedExpense={saveEditedExpense}
     />
    <Divider orientation="horizontal"/>
    <ErrorAlert showAlert={showAlert} handleClose={handleClose}/>
    { //conditionaly rendering loader
      expenses.length ? <Stack pt="30px" spacing={1} justifyContent="center" mx={{xs:"0", sm:"7%"}}>
    {
      expenses.map((item)=>(
        <Expense 
        key={item._id} 
        id={item._id} 
        expense={item.expense}
        description={item.description}
        amount={item.amount}
        date={item.date}
        deleteExpense={deleteExpense}
        handleEditClick={handleEditClick}
        />
      ))
    }
    </Stack> 
    : <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "50vh" }}>
      <CircularProgress color="secondary"/>
    </Box>
    }
    <Footer/>
    </ThemeProvider>
}

export default App;
