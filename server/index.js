import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Expense from "./model/Expense";


const app = express();
app.use(express.json()); //express's own json parser....bodyparser alternative
app.use(cors()); //to avoid cross origin errors

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("database connected"))
.catch((err) => console.log(err));