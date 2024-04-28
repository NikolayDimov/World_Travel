import { createContext, useEffect, useState, ReactNode, useContext } from "react";

const BASE_URL = "http://localhost:9000";

export interface CityContextType {
    cityName: string;
    country: string;
    emoji: string;
    date: string;
    notes: string;
    position: {
        lat: string;
        lng: string;
    };
    id?: string;
}

export interface CitiesContextType {
    cities: CityContextType[];
    isLoading: boolean;
    currentCity: CityContextType | null;
    getCity: (id: string | undefined) => Promise<void>;
    createCity: (newCity: CityContextType) => Promise<void>;
    deleteCity: (id: string | undefined) => Promise<void>;
}

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

export const CitiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cities, setCities] = useState<CityContextType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState(null);

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (error) {
                alert("There was an error loading data...");
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

    async function getCity(id: string | undefined) {
        try {
            setIsLoading(true);
            setCurrentCity(null);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch (error) {
            alert("There was an error loading data...");
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity(newCity: CityContextType) {
        try {
            setIsLoading(true);
            setCurrentCity(null);
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setCities((cities) => [...cities, data]);
        } catch (error) {
            alert("There was an error creating city...");
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCity(id: string | undefined) {
        try {
            setIsLoading(true);
            setCurrentCity(null);
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });

            setCities((cities) => cities.filter((city) => city.id !== id));
        } catch (error) {
            alert("There was an error deleting city...");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>
            {children}
        </CitiesContext.Provider>
    );
};

export function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error("Cities context was used outside of CitiesProvider");
    }
    return context;
}
