import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: "primary" | "back" | "position";
}

function Button({ children, onClick, type }: ButtonProps) {
    return (
        <button onClick={onClick} className={`${styles.btn} ${type && styles[type]}`}>
            {children}
        </button>
    );
}

export default Button;
