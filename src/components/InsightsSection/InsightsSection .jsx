import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styles from "./InsightSection.module.css"

const InsightsSection = () => {
  const budget = useSelector(state => state.budget);
  const expenses = useSelector((state) => state.expense);

  const categoryExpenses = useMemo(() => {
    return expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
  }, [expenses]);

  const totalExpenses = useMemo(() => {
    return Object.values(categoryExpenses).reduce((acc, expense) => acc + expense, 0);
  }, [categoryExpenses]);

  const data = useMemo(() => {
    return [
      {
        category: "All",
        budget: budget.totalBudget || 0,
        expense: totalExpenses,
        balance: (budget.totalBudget || 0) - totalExpenses
      },
      ...Object.keys(budget.categories).map(category => {
        const categoryBudget = budget.categories[category] || 0;
        const categoryExpense = categoryExpenses[category] || 0;
        return {
          category,
          budget: categoryBudget,
          expense: categoryExpense,
          balance: categoryBudget - categoryExpense
        };
      })
    ];
  }, [budget, categoryExpenses, totalExpenses]);

  return (
    <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Limit Status</th>
                        <th>Budget</th>
                        <th>Expense</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ category, budget, expense, balance }) => (
                        <tr key={category}>
                            <td>{category}</td>
                            <td>
                                {expense > budget ? (
                                    <span className={`${styles.pill} ${styles.exceeded}`}>exceeded</span>
                                ) : (
                                    <span className={`${styles.pill} ${styles.within}`}>within</span>
                                )}
                            </td>
                            <td>{budget}</td>
                            <td>{expense}</td>
                            <td>{balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
};

export default InsightsSection;
