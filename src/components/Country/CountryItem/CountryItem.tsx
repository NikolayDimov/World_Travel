import React from "react";
import styles from "./CountryItem.module.css";

interface CountryItemProps {
    country: string;
    emoji: string;
}

const CountryItem: React.FC<CountryItemProps> = ({ country, emoji }) => {
    return (
        <li className={styles.countryItem}>
            <span>{emoji}</span>
            <span>{country}</span>
        </li>
    );
};

export default CountryItem;
