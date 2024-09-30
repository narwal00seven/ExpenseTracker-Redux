import { useState, useEffect } from "react";
import InputField from "../../components/InputField/InputField";
import styles from "./LandingPage.module.css";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { setBudget, updateBudget } from "../../slice";
import { useNavigate } from "react-router-dom";
import { stopEditing } from "../../slice";
import Button from "../../components/Button/Button";

const LandingPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = useState('');
    const [totalBudget, setTotalBudget] = useState('');
    const [categories, setCategories] = useState({
        Food: '',
        Travel: '',
        Utilities: '',
        Other: '',
    });
    const isEditable = useSelector(state => state.edit.isEditable);
    const budget = useSelector(state => state.budget);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditable && budget.name) {
            setName(budget.name);
            setTotalBudget(budget.totalBudget);
            setCategories(budget.categories);
        }
    }, [isEditable, budget]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedTotalBudget = parseInt(totalBudget);
        if(parsedTotalBudget <=0){
            enqueueSnackbar("Total Budget Cant be 0", { variant: 'error' });
            return;
        }
        console.log(parsedTotalBudget);
        const parsedCategories = {
            Food: parseInt(categories.Food),
            Travel: parseInt(categories.Travel),
            Utilities: parseInt(categories.Utilities),
            Other: parseInt(categories.Other),
        };
        
        const categoryTotal = Object.values(parsedCategories).reduce((sum, value) => sum + value, 0);

        if (categoryTotal > parsedTotalBudget) {
            enqueueSnackbar("Total categorical budget should not exceed monthly budget", { variant: 'error' });
            return;
        }

        if (categoryTotal < parsedTotalBudget) {
            parsedCategories.Other += parsedTotalBudget - categoryTotal;
        }

        const budgetData = {
            name,
            totalBudget: parsedTotalBudget,
            categories: parsedCategories,
        };

        if (isEditable) {
            enqueueSnackbar("Budget Updates successfully. Navigating to Transaction Page.", { variant: "success" });
            dispatch(updateBudget(budgetData));
        } else {
            enqueueSnackbar("Budget added successfully. Navigating to Transaction Page.", { variant: "success" });
            dispatch(setBudget(budgetData));
        }

        dispatch(stopEditing());
        setTimeout(() => {
            navigate('/transaction');
        }, 400);
    }

    const handleNewTracker = () => {
        setName('');
        setTotalBudget('');
        setCategories({
            Food: '',
            Travel: '',
            Utilities: '',
            Other: '',
        });
        dispatch(stopEditing());
        navigate('/');
    };

    const handleGoBack = () => {
        navigate('/transaction');
    };

    return(
        <div className={styles.container}>
            <h1>{isEditable ? "Update Your Budget" : "Expense Tracker"}</h1>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <InputField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <InputField label="Total Budget" value={totalBudget} onChange={(e) => setTotalBudget(e.target.value)} type="number" min="1" required />
                <InputField label="Food Budget" value={categories.Food} onChange={(e) => setCategories({ ...categories, Food: e.target.value })} type="number" min="0" required />
                <InputField label="Travel Budget" value={categories.Travel} onChange={(e) => setCategories({ ...categories, Travel: e.target.value })} type="number" min="0" required />
                <InputField label="Utilities Budget" value={categories.Utilities} onChange={(e) => setCategories({ ...categories, Utilities: e.target.value })} type="number" min="0" required />
                <InputField label="Other Budget" value={categories.Other} onChange={(e) => setCategories({ ...categories, Other: e.target.value })} type="number" min="0" required />
                {isEditable ? (
                    <div className={styles.buttonList}>
                        <Button style="secondary" onClick={handleSubmit}>Update Budget</Button>
                        <Button style="secondary" onClick={handleNewTracker}>New Tracker</Button>
                        <Button style="secondary" onClick={handleGoBack}>Go Back</Button>
                    </div>
                ) : (
                    <div className={styles.buttonList}>
                        <Button style="primary" type="submit">Submit</Button>
                    </div>
                )}
            </form>
        </div>
    );

};

export default LandingPage;