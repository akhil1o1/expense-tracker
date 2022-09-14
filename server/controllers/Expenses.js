import Expense from "../model/expense.js";

export const getExpenses = async (req, res)=>{
    const expenses = await Expense.find({});
    res.json(expenses);
}

export const postExpense = (req, res)=>{
    console.log(req.body);
    const newExpense = new Expense({
        expense :req.body.expense,
        description : req.body.description,
        amount :req.body.amount
    });

    newExpense.save((err)=>{
        if(!err){
            res.json(newExpense);
        }else{
            console.log(err);
            res.json(err);
        }
    })
}

export const editExpense = (req, res)=>{
    const id = req.params.id;
    
    Expense.findOneAndUpdate({_id:id}, 
        {$set: {expense: req.body.expense, description: req.body.description, amount: req.body.amount}}, {returnDocument: "after"}, (err, updatedDocument)=>{ //returnDocument:"after" returns updated doc
            if(!err){
                res.json(updatedDocument);
            }else{
                res.json(err);
            }
         })
}


export const deleteExpense = async (req, res)=>{
    const id = req.params.id;
    const response = await Expense.findByIdAndDelete({_id : id});
    res.json(response);
}