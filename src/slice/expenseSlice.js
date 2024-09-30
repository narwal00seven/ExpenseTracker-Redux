import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const expenseSlice = createSlice({
    name: "expense",
    initialState : [],
    reducers : {
        addExpense : (state, action) => {
            const newExpense = { ...action.payload, id: uuidv4() };
            state.push(newExpense);
        },
        deleteExpense : (state, action) => {
            console.log(action.payload)
            return state.filter(expense => expense.id !== action.payload);
        },
    },
});

export default expenseSlice;