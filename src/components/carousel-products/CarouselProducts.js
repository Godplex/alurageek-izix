import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick/lib/slider";
import { settingsCarousel } from "../../helpers/settingsCarousel";
import { ProductItem } from "./ProductItem";

export const CarouselProducts = ({ title, products }) => {
  return (
    <section className="py-4 bg-secondary">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="display-5 fw-bolder text-capitalize">{title}</h2>
          {title !== "productos similares" ? (
            <Link
              to="/admin/products"
              className="text-decoration-none text-primary fw-bolder"
            >
              Ver todo <i className="fa-solid fa-arrow-right"></i>
            </Link>
          ) : (
            ""
          )}
        </div>
        <Slider {...settingsCarousel} className="slider-products">
          {products.map((item) => (
            <ProductItem key={item.id} title={title} {...item} />
          ))}
        </Slider>
      </div>
    </section>
  );
};
