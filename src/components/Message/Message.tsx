import React from "react";
import styles from "./Message.module.css";

interface Props {
    message: string;
}

const Message: React.FC<Props> = ({ message }) => {
    return (
        <p className={styles.message}>
            <span role="img">👋</span> {message}
        </p>
    );
};

export default Message;
