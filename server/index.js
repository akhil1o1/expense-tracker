import * as dotenv from "dotenv";
import express, {json} from "express";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import expenseRoutes from "./routes/expenses.js";

const app = express();
app.use(cors()); //to avoid cross origin errors
app.use(express.json()); //express's own json parser....bodyparser alternative
app.use(express.urlencoded({ 
    extended: true
  }));// encode data coming from a form
app.use("/expenses", expenseRoutes ); 


mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("database connected"))
.catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, ()=>{
    console.log("server is listening at port " + process.env.PORT)});