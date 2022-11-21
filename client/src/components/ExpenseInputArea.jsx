import React from "react";
import { Stack, Divider, Button } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DescriptionIcon from "@mui/icons-material/Description";
import ExpenseInput from "./ExpenseInput";

function ExpenseInputArea({
  newExpense,
  setNewExpense,
  addExpense,
  editExpenseId,
  saveEditedExpense,
}) {
  editExpenseId && console.log(`inside ExpenseInputArea : ${editExpenseId}`);

  function handleChange(event) {
    const { name, value } = event.target;
    setNewExpense((prevNewExpense) => ({ ...prevNewExpense, [name]: value }));
  }

  return (
    <Stack
      pt="40px"
      pb="30px"
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      justifyContent="center"
      divider={<Divider orientation="vertical" flexItem />}
    >
      <ExpenseInput
        value={newExpense.expense}
        handleChange={handleChange}
        name="expense"
        label={"Expense"}
        icon={<ShoppingBagIcon />}
      />
      <ExpenseInput
        value={newExpense.description}
        handleChange={handleChange}
        label={"Description"}
        name="description"
        icon={<DescriptionIcon />}
      />
      <ExpenseInput
        value={newExpense.amount}
        handleChange={handleChange}
        name="amount"
        label={"Amount"}
        icon={<CurrencyRupeeIcon />}
      />
      <Button
        variant="outlined"
        size="medium"
        color="secondary"
        onClick={() => {
          editExpenseId
            ? saveEditedExpense(newExpense)
            : addExpense(newExpense);
        }}
      >
        {editExpenseId ? "Save Edit" : "Add Expense"}
      </Button>
    </Stack>
  );
}

export default ExpenseInputArea;
