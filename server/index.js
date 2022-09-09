import * as dotenv from "dotenv";
import express, {json} from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json()); //express's own json parser....bodyparser alternative
app.use(express.urlencoded({ // encode data coming from a form
    extended: true
  }));
app.use(cors()); //to avoid cross origin errors


mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("database connected"))
.catch((err) => console.log(err));

import Expense from "./model/Expense.js";

//api to get all expenses..using get request
app.get("/expenses", async (req, res)=>{
    const expenses = await Expense.find({});
    res.json(expenses);
});

//api to add expense..using post request
app.post("/expenses", (req, res)=>{

    console.log(req.body);
    
    const newExpense = new Expense({
        expense :req.body.expense,
        amount :req.body.amount
    });

    newExpense.save((err)=>{
        if(!err){
            res.json(newExpense);
        }else{
            res.json(err);
        }
    })
})

//api to edit expense..using patch request
app.patch("/expense/edit/:id", (req, res)=>{
    const id = req.params.id;

    Expense.findOneAndUpdate({_id:id}, 
        {$set: {expense: req.body.expense, amount: req.body.amount}}, {returnDocument: "after"}, (err, updatedDocument)=>{ //returnDocument:"after" returns updated doc
            if(!err){
                res.json(updatedDocument);
            }else{
                res.json(err);
            }
         })
});

//api to delete expense..using delete request

app.delete("/expense/delete/:id", async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    const response = await Expense.findByIdAndDelete({_id : id});
    res.json(response);
})

// const mobile = new Expense({
//     expense :"baught a mobile phone",
//     amount: 12000
// })
// mobile.save();

// const earphone = new Expense({
//     expense: "baught a earphone",
//     amount: 1000
// })
// earphone.save();

// const jeans = new Expense({
//     expense: "baught a jeans",
//     amount: 1200
// })
// jeans.save();

// const rent = new Expense({
//     expense: "paid rent",
//     amount: 3000
// })
// rent.save();



app.listen(process.env.PORT, ()=>{
    console.log("server is listening at port " + process.env.PORT)});