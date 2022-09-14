import express from "express";
import {getExpenses, postExpense, editExpense, deleteExpense} from "../controllers/expenses.js";

const router = express.Router();

router.get("/", getExpenses);
router.post("/", postExpense);
router.patch("/edit/:id", editExpense);
router.delete("/delete/:id", deleteExpense);

export default router;