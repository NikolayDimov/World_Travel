import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../../contexts/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../Button/Button";

function Map() {
    const { cities } = useCities();
    const [searchParams] = useSearchParams();
    const { isLoading: isLoadingPosition, position: goelocationPostion, getPosition } = useGeolocation();

    const defaultLat: number = 40;
    const defaultLng: number = 0;

    // Fetch lat and lng from URL, or use default values
    const latString = searchParams.get("lat");
    const lngString = searchParams.get("lng");
    const mapLat = latString ? parseFloat(latString) : defaultLat;
    const mapLng = lngString ? parseFloat(lngString) : defaultLng;

    // Use state to handle map position
    const [mapPosition, setMapPosition] = useState([mapLat, mapLng]);

    // Effect to update map position if URL parameters change
    useEffect(() => {
        if (mapLat && mapLng) {
            setMapPosition([mapLat, mapLng]);
        }
    }, [mapLat, mapLng]);

    useEffect(() => {
        if (goelocationPostion) {
            setMapPosition([goelocationPostion.lat, goelocationPostion.lng]);
        }
    }, [goelocationPostion]);

    return (
        <div className={styles.mapContainer}>
            {!goelocationPostion && (
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? "Loading..." : "Use your position"}
                </Button>
            )}
            <MapContainer className={styles.map} center={mapPosition} zoom={8} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker position={[parseFloat(city.position.lat), parseFloat(city.position.lng)]} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}

                <ChangeCenter position={mapPosition as [number, number]} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

interface ChangeCenterProps {
    position: [number, number];
}

function ChangeCenter({ position }: ChangeCenterProps) {
    const map = useMap();

    // Check if position has exactly two elements before setting the view
    if (position.length === 2) {
        map.setView(position, map.getZoom());
    }

    return null;
}

interface CustomMouseEvent {
    latlng: {
        lat: number;
        lng: number;
    };
}

export function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: (e: CustomMouseEvent) => {
            console.log(e);
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        },
    });
    return null;
}

export default Map;
