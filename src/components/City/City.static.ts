export interface CityItemProps {
    cityName: string;
    country: string;
    emoji: string;
    date: string;
    notes: string;
    position: {
        lat: number;
        lng: number;
    };
    id: string;
}

export interface CityProps {
    cities: CityItemProps[];
    isLoading: boolean;
}
