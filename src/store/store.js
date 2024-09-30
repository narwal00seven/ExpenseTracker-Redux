import {budgetReducer, editReducer, expenseReducer, filterReducer} from "../slice/index";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer : {
        budget : budgetReducer ,
        expense: expenseReducer ,
        edit : editReducer,
        filter : filterReducer,
    }
});


export default store;