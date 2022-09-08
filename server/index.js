import * as dotenv from "dotenv";
import express, {json} from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json()); //express's own json parser....bodyparser alternative
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
app.post("/expenses/new", (req, res)=>{
    const newExpense = new Expense({
        expense : req.body.expense,
        amount : req.body.amount
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
app.patch("/expenses/edit/:id", async (req, res)=>{
    const id = req.params.id;
    const field = req.body.field;
    const value = req.body.value;

    const response = await Expense.updateOne({_id:id}, {field: value});

    res.json(response);

});

//api to delete expense..using delete request

app.delete("expenses/delete/:id", async (req, res)=>{
    
    const id = req.params.id;
    const response = await Expense.findByIdAndDelete({_id : id});
    res.json(response);
})



app.listen(process.env.PORT, ()=>{
    console.log("server is listening at port " + process.env.PORT)})