import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Product from "./pages/Product/Product";
import Homepage from "./pages/Homepage/Homepage";
import Pricing from "./pages/Pricing/Pricing";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import CityList from "./components/City/CityList";
import CountryList from "./components/Country/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";

const BASE_URL = "http://localhost:9000";

function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={<AppLayout />}>
                <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
                <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
                <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default App;
