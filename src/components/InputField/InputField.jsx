import styles from "./InputField.module.css";

const InputField = ({label, value, onChange, type="text",required=false }) => {
    return (
        <div className={styles.inputField}>
            <label className={styles.label}>{label}</label>
            <input 
            type = {type} 
            value ={value} 
            onChange={onChange} 
            required={required}
            className={styles.input} 
            />
        </div>
    )
}

export default InputField;