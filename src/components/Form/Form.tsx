// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import BackButton from "../BackButton/BackButton";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";

export function convertToEmoji(countryCode: string) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

const BASE_URL_MAP = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
    const [lat, lng] = useUrlPosition();
    const [cityName, setCityName] = useState("");
    const [countryName, setCountryName] = useState("");
    const [date, setDate] = useState<Date | null>(null);
    const [notes, setNotes] = useState("");
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [emoji, setEmoji] = useState("");
    const [geocodingError, setGeocodingError] = useState("");

    useEffect(() => {
        if (!lat && !lng) {
            return;
        }
        async function fetchCityData() {
            try {
                setIsLoadingGeocoding(true);
                setGeocodingError("");
                const res = await fetch(`${BASE_URL_MAP}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();
                if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere esle 😉");
                setCityName(data.city || data.locality || "");
                setCountryName(data.coutry);
                setEmoji(convertToEmoji(data.countryCode));
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
                setGeocodingError(errorMessage);
            } finally {
                setIsLoadingGeocoding(false);
            }
        }
        fetchCityData();
    }, [lat, lng]);

    function handleSubmit(e) {
        e.preventDefault();
    }

    const dummyClickHandler = () => {};

    if (isLoadingGeocoding) {
        return <Spinner />;
    }

    if (!lat && !lng) {
        return <Message message="Start by clicking somewhere on the map" />;
    }

    if (geocodingError) {
        return <Message message={geocodingError} />;
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker onChange={(date) => setDate(date)} selected={date} dateFormat="dd/MM/yyyy" />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
            </div>

            <div className={styles.buttons}>
                <Button type="primary" onClick={dummyClickHandler}>
                    Add
                </Button>
                <BackButton></BackButton>
            </div>
        </form>
    );
}

export default Form;
