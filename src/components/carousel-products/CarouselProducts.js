import React from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick/lib/slider'
import { ProductItem } from './ProductItem';

export const CarouselProducts = ({ title, products }) => {

  var settings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplaySpeed: 4000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 4,
          dots: true,
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          dots: true,
          rows: 2,
        }
      },
    ]
  };

  return (
    <section className="py-4 bg-secondary">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="display-5 fw-bolder text-capitalize">
            {title}
          </h2>
          {
            (title !== "productos similares")
              ?
              <Link to="/products" className="text-decoration-none text-primary fw-bolder">
                Ver todo <i className="fa-solid fa-arrow-right"></i>
              </Link>
              :
              ""
          }
        </div>
        <Slider {...settings} className="slider-products">
          {
            products.map(item => (
              <ProductItem
                key={item.id}
                title={title}
                {...item}
              />
            ))
          }
        </Slider>
      </div>
    </section>
  )
}
