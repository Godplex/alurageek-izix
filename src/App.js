import { useState } from "react";
import {
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import firebaseApp from "./firebaseconf";
import { AddProductPage } from "./pages/addproduct/AddProductPage";
import { HomePage } from "./pages/home/HomePage";
import { LoginPage } from "./pages/login/LoginPage";
import { ProductPage } from "./pages/product/ProductPage";
import { ProductsPage } from "./pages/products/ProductsPage";

export const App = () => {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/category/:title/product/:productId" element={<ProductPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </HashRouter>
  )
}
