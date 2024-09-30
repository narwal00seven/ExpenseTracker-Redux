import expenseSlice from "./expenseSlice";
import budgetSlice from "./budgetSlice";
import editSlice from "./editSlice";
import filterSlice from "./filterSlice";


export const {addExpense, deleteExpense} = expenseSlice.actions;
export const expenseReducer =  expenseSlice.reducer;
export const {setBudget, updateBudget} = budgetSlice.actions;
export const budgetReducer =  budgetSlice.reducer;
export const {startEditing , stopEditing} = editSlice.actions;
export const editReducer = editSlice.reducer;
export const {setFilter} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;