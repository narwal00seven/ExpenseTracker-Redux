import { useState } from "react";
import Button from "../Button/Button"
import styles from "./NewExpenseSection.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { addExpense } from "../../slice";

const NewExpenseSection = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Other');
    const [amount, setAmount] = useState(0);
    const dispatch = useDispatch();
    const budget = useSelector(state => state.budget);
    const expenses = useSelector(state => state.expense);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !amount || amount <= 0) {
            enqueueSnackbar("All fields must be filled out and amount must be greater than 0.", {variant: "error"});
            return;
        }

        const newExpense = parseInt(amount);
        const totalBudget = budget.totalBudget;
        const categoryBudget = budget.categories[category];
        const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

        if (newExpense > totalBudget - totalExpenses || newExpense > categoryBudget) {
            const userConfirmed = window.confirm(`Hey your ${category.toLowerCase()} expense is exceeding your current budget. Do you want to proceed?`);
            if (!userConfirmed) {
                enqueueSnackbar("Ooops!!! Failed to Add expense as you requested ", {variant: "error"});
                return;
            }
        }

        dispatch(addExpense({ name, category, amount: newExpense }));
        enqueueSnackbar("Expense Added", {variant: "success"});
        setName("");
        setCategory("Other");
        setAmount("");
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <label>
                Expense Name:
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </label>
            <label>
                Expense Category:
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    required
                >
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Other">Other</option>
                </select>
            </label>
            <label>
                Expense Amount:
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    min="0.01" 
                    step="0.01" 
                    required 
                />
            </label>
            <Button type="submit" style="primary">Submit</Button>
        </form>
    )
}

export default NewExpenseSection;