import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { CityContextType } from "../../../contexts/CitiesContext";

const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

interface CityItemProps {
    city: CityContextType;
}

function CityItem({ city }: CityItemProps) {
    const { cityName, emoji, date, id, position } = city;
    console.log(position);

    return (
        <li>
            <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={styles.cityItem}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
}

export default CityItem;
