import { CityItemProps, CityProps } from "../City/City.static";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import CountryItem from "./CountryItem/CountryItem";
import styles from "./CountryList.module.css";

function CountryList({ cities, isLoading }: CityProps) {
    if (isLoading) return <Spinner />;
    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />;

    const countries: { country: string; emoji: string }[] = cities.reduce(
        (arr: { country: string; emoji: string }[], city: CityItemProps) => {
            if (!arr.map((el) => el.country).includes(city.country)) {
                return [...arr, { country: city.country, emoji: city.emoji }];
            } else {
                return arr;
            }
        },
        []
    );

    return (
        <ul className={styles.countryList}>
            {countries.map((country: { country: string; emoji: string }) => (
                <CountryItem country={country.country} emoji={country.emoji} key={country.country} />
            ))}
        </ul>
    );
}

export default CountryList;
