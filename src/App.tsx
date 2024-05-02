import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/FakeAuthContext";
import { ProtectedRoute } from "./pages/ProtectedRoute/ProtectedRoute";
import { CitiesProvider } from "./contexts/CitiesContext";

import CityList from "./components/City/CityList";
import CountryList from "./components/Country/CountryList";
import CurrentCity from "./components/City/City/CurrentCity";
import Form from "./components/Form/Form";
import SpinnerFullPage from "./components/Spinner/SpinnerFullPage";

// import Product from "./pages/Product/Product";
// import Pricing from "./pages/Pricing/Pricing";
// import Homepage from "./pages/Homepage/Homepage";
// import Login from "./pages/Login/Login";
// import AppLayout from "./pages/AppLayout/AppLayout";
// import PageNotFound from "./pages/PageNotFound/PageNotFound";

// LazyLoading - now load each of these components, when we need them.
// Automaticly split our bundle into sepat=rate chunks.
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Product = lazy(() => import("./pages/Product/Product"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
const Login = lazy(() => import("./pages/Login/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <Suspense fallback={<SpinnerFullPage />}>
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
                </Suspense>
            </CitiesProvider>
        </AuthProvider>
    );
}

export default App;
