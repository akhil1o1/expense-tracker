import express from "express";
import {getExpenses, postExpense, editExpense, deleteExpense} from "../controllers/Expenses.js";

const router = express.Router();

router.get("/expenses", getExpenses);
router.post("/expenses", postExpense);
router.patch("/expense/edit/:id", editExpense);
router.delete("/expense/delete/:id", deleteExpense);

export default router;