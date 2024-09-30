import React from "react";
import styles from "./Button.module.css"

const Button = ({onClick, style,type="button", children}) => {
    return <button 
    onClick={onClick} 
    type={type}
    className={`${styles.button} ${styles[style]}`}
    >
        {children}
    </button>
};

export default Button;