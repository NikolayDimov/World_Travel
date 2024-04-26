import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product/Product";
import Homepage from "./pages/Homepage/Homepage";
import Pricing from "./pages/Pricing/Pricing";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import City from "./components/City/City";
import CountryItem from "./components/Country/CountryItem";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="app" element={<AppLayout />}>
                <Route index element={<p>LIST</p>} />
                <Route path="cities" element={<p>List of cities</p>} />
                <Route path="countries" element={<p>List of countries</p>} />
                <Route path="form" element={<p>Form</p>} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default App;
