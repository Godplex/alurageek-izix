import { Route, Routes } from "react-router-dom";
import { ProductPage } from "../pages/product/ProductPage";
import { ProductsPage } from "../pages/products/ProductsPage";
import { AddProductPage } from "../pages/addproduct/AddProductPage";
import { HomePage } from "../pages/home/HomePage";
import { NotFoundPage } from "../pages/notfound/NotFoundPage";

export const DashboardPrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:title/product/:productId" element={<ProductPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}
