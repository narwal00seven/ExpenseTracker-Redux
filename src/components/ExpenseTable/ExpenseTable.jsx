import { useDispatch, useSelector } from "react-redux";
import styles from "./ExpenseTable.module.css";
import {deleteExpense} from "../../slice/index";
import { setFilter } from "../../slice/index";

const ExpenseTable = () => {

    const filter = useSelector(state => state.filter.filter);
    const expenses = useSelector(state => state.expense);
    const dispatch = useDispatch();

    const filteredExpenses = filter === 'All' ? expenses : expenses.filter(exp => exp.category === filter);


    const handleDelete = (id) => {
        dispatch(deleteExpense(id));
    };


    return (
        <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Transaction</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense, index) => (
            <tr key={expense.id}>
              <td>{index + 1}</td>
              <td>{expense.name}</td>
              <td>{expense.category}</td>
              <td>{expense.amount}</td>
              <td>
                <button className={styles.deleteButton} onClick={() => handleDelete(expense.id)}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.filterContainer}>
        {['All', 'Food', 'Travel', 'Utilities', 'Other'].map(fill => (
          <span
            key={fill}
            className={`${styles.pill} ${filter === fill ? styles.selected : ''}`}
            onClick={() => dispatch(setFilter(fill))}
          >
            {fill}
          </span>
        ))}
      </div>
      </div>
    );
};

export default ExpenseTable;