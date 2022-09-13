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

app.listen(process.env.PORT, ()=>{
    console.log("server is listening at port " + process.env.PORT)});