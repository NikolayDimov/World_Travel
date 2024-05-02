// ***--- useReducer ---***

import { createContext, useEffect, ReactNode, useContext, useReducer, useCallback } from "react";

const BASE_URL = "http://localhost:9000";

interface StateType {
    cities: CityContextType[];
    isLoading: boolean;
    currentCity: CityContextType | null;
    error: string;
}

type ActionType =
    | { type: "loading" }
    | { type: "cities/loaded"; payload: CityContextType[] }
    | { type: "city/loaded"; payload: CityContextType }
    | { type: "city/created"; payload: CityContextType }
    | { type: "city/deleted"; payload: string }
    | { type: "rejected"; payload: string };

function reducer(state: StateType, action: ActionType): StateType {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };

        case "cities/loaded":
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            };

        case "city/loaded":
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            };

        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };

        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== action.payload),
                currentCity: null,
            };

        case "rejected":
            return { ...state, isLoading: false, error: action.payload };

        default:
            throw new Error("Unknown action type");
    }
}

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: null,
    error: "",
};

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
    error: string;
    getCity: (id: string | undefined) => Promise<void>;
    createCity: (newCity: CityContextType) => Promise<void>;
    deleteCity: (id: string | undefined) => Promise<void>;
}

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

export const CitiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // const [state, dispatch] = useReducer(reducer, initialState);
    const [{ cities, isLoading, currentCity, error }, dispatch]: [StateType, React.Dispatch<ActionType>] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        async function fetchCities() {
            dispatch({ type: "loading" });

            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: "cities/loaded", payload: data });
            } catch (error) {
                dispatch({ type: "rejected", payload: "There was an error loading cities..." });
            }
        }

        fetchCities();
    }, []);

    const getCity = useCallback(
        async function getCity(id: string | undefined) {
            if (currentCity && id === currentCity.id) {
                return;
            }
            dispatch({ type: "loading" });

            try {
                const res = await fetch(`${BASE_URL}/cities/${id}`);
                const data = await res.json();
                dispatch({ type: "city/loaded", payload: data });
            } catch (error) {
                dispatch({ type: "rejected", payload: "There was an error loading city..." });
            }
        },
        [currentCity]
    );

    async function createCity(newCity: CityContextType) {
        dispatch({ type: "loading" });

        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            dispatch({ type: "city/created", payload: data });
        } catch (error) {
            dispatch({ type: "rejected", payload: "There was an error creating city..." });
        }
    }

    async function deleteCity(id: string | undefined) {
        dispatch({ type: "loading" });

        try {
            if (id !== undefined) {
                // Check if id is not undefined
                await fetch(`${BASE_URL}/cities/${id}`, {
                    method: "DELETE",
                });
                dispatch({ type: "city/deleted", payload: id });
            } else {
                throw new Error("Cannot delete city: ID is undefined");
            }
        } catch (error) {
            dispatch({ type: "rejected", payload: "There was an error deleting city..." });
        }
    }

    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, error, getCity, createCity, deleteCity }}>
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
