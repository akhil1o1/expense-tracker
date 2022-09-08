import mongoose from "mongoose";

const expenseShema = new mongoose.Schema({
    expense : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    }, 
    date : {
        type : Date,
        default : Date.now()
    }
})


const Expense = new mongoose.model("Expense", expenseShema);

export default Expense;