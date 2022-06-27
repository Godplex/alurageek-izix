import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick/lib/slider";
import { AllProductsItem } from "./AllProductsItem";
import { PropagateLoader } from "react-spinners";
import logo from "../../assets/logo.png";
import { settingsAllProducts } from "../../helpers/settingsAllProducts";
import { getProducts } from "../../firebase/providers";

export const AllProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(setProducts, setIsLoading);
  }, []);

  return (
    <>
      <section className="py-4 bg-secondary">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="display-5 fw-bolder">Todos los productos</h2>
            <Link to="/admin/add-product" className="btn btn-primary p-3">
              Agregar producto
            </Link>
          </div>
          {!isLoading
            ? (
              products.length > 0 ? (
                <Slider {...settingsAllProducts(products.length)} className="slider-products">
                  {products.map((item) => (
                    <AllProductsItem
                      key={item.id}
                      product={item}
                      products={products}
                      setProducts={setProducts}
                    />
                  ))}
                </Slider>
              ) : (
                <div className="d-flex flex-column justify-content-center align-items-center py-5 my-5">
                  <p className="display-6 m-0 text-center">
                    No hay productos disponibles.
                  </p>
                </div>
              )
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center py-5 my-5">
                <img
                  src={logo}
                  alt="logo"
                  className="col-xl-1 col-lg-2 col-md-3 col-6"
                />
                <PropagateLoader color={"#2A7AE4"} />
              </div>
            )}
        </div>
      </section>
    </>
  );
};
