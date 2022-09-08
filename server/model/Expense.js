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
        type: Date,
        default: new Date()
    }
})


const Expense = mongoose.model("Expense", expenseShema);

export default Expense;