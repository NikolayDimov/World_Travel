import { Navigate, Route, Routes } from "react-router-dom";

import Product from "./pages/Product/Product";
import Homepage from "./pages/Homepage/Homepage";
import Pricing from "./pages/Pricing/Pricing";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import CityList from "./components/City/CityList";
import CountryList from "./components/Country/CountryList";
import Form from "./components/Form/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import CurrentCity from "./components/City/City/CurrentCity";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { ProtectedRoute } from "./pages/ProtectedRoute/ProtectedRoute";

function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="product" element={<Product />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="login" element={<Login />} />
                    <Route
                        path="app"
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Navigate replace to="cities" />} />
                        <Route path="cities" element={<CityList />} />
                        <Route path="cities/:id" element={<CurrentCity />} />
                        <Route path="countries" element={<CountryList />} />
                        <Route path="form" element={<Form />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </CitiesProvider>
        </AuthProvider>
    );
}

export default App;
