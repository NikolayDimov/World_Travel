import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import styles from "./City.module.css";
import { CityItemProps, CityProps } from "./City.static";
import CityItem from "./CityItem/CityItem";

function CityList({ cities, isLoading }: CityProps) {
    if (isLoading) return <Spinner />;

    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />;

    return (
        <ul className={styles.cityList}>
            {cities.map((city: CityItemProps) => (
                <CityItem city={city} key={city.id} />
            ))}
        </ul>
    );
}

export default CityList;
