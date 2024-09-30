import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startEditing } from "../../slice/index";
import styles from "./TransactionPage.module.css"
import Button from "../../components/Button/Button";
import InsightsSection from "../../components/InsightsSection/InsightsSection ";
import NewExpenseSection from "../../components/NewExpenseSection/NewExpenseSection";
import { useState } from "react";
import ExpenseTable from "../../components/ExpenseTable/ExpenseTable";

const TransactionPage = () => {
    const budget = useSelector(state => state.budget);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openExpenseSection, setOpenExpenseSection] = useState(false);
    
    const handleEditTracker = () => {
        dispatch(startEditing());
        navigate('/');
    };

    return(
        <div className={styles.container}>
            <header className={styles.banner}>
                <h1>{budget.name ? `${budget.name}'s` : ""} Expense Tracker</h1>
                <Button onClick={handleEditTracker} style="secondary">New/Update Tracker</Button>
            </header>
            <div className={styles.showbanner}>
                <h3 className={`${styles.header} ${styles.decoration}`} onClick={() => setOpenExpenseSection(prevState => !prevState)}>Click here to Add New Expense</h3>

                {openExpenseSection && <NewExpenseSection />}
            </div>
            <div className={styles.showbanner}>
                <h3 className={styles.header}>Insights</h3>
                    <InsightsSection />
            </div>
            <div className={styles.showbanner}>
                <h3 className={styles.header}>Expenses Table</h3>
            <ExpenseTable />
            </div>
        </div>
    );
    
};

export default TransactionPage;