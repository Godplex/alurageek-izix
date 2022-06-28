import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick/lib/slider";
import { getProductsByCategory } from "../../firebase/providers";
import { settingsCarousel } from "../../helpers/settingsCarousel";
import { ProductItem } from "./ProductItem";
import logo from "../../assets/logo.png";
import { PropagateLoader } from "react-spinners";

export const CarouselProducts = ({ title }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsByCategory(title, setProducts, setIsLoading);
  }, []);

  return (
    <section className="py-4 bg-secondary">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="display-5 fw-bolder text-capitalize">{title}</h2>
          <Link
            to="/admin/products"
            className="text-decoration-none text-primary fw-bolder"
          >
            Ver todo <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        {
          !isLoading
            ?
            (products.length > 0)
              ?
              <Slider {...settingsCarousel(products.length)} className="slider-products">
                {products.map((item) => (
                  <ProductItem key={item.id} title={title} {...item} />
                ))}
              </Slider>
              :
              <div className="d-flex flex-column justify-content-center align-items-center py-5 my-5">
                <p className="display-6 m-0 text-center">
                  No hay productos disponibles.
                </p>
              </div>
            :
            <div className="d-flex flex-column justify-content-center align-items-center py-5 my-5">
              <img
                src={logo}
                alt="logo"
                className="col-xl-1 col-lg-2 col-md-3 col-6"
              />
              <PropagateLoader color={"#2A7AE4"} />
            </div>
        }
      </div>
    </section>
  );
};
