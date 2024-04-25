import { Route, Routes } from "react-router-dom";
import Product from "./pages/Product/Product";
import Homepage from "./pages/Homepage/Homepage";
import Pricing from "./pages/Pricing/Pricing";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="app" element={<AppLayout />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default App;
