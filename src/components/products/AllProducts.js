import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick/lib/slider';
import { categoryProducts } from '../../assets/data/products';
import { AllProductsItem } from './AllProductsItem';

export const AllProducts = () => {

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
        rows: 3,
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
                    rows: 9,
                }
            },
        ]
    };

    const productsCategory = categoryProducts.map(({ products }) => products);
    const products = productsCategory[0].concat(productsCategory[1], productsCategory[2]);

    return (
        <section className="py-4 bg-secondary">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="display-5 fw-bolder text-capitalize">
                        Todos los productos
                    </h2>
                    <Link to="/admin/add-product" className="btn btn-primary p-3">
                        Agregar producto
                    </Link>
                </div>
                <Slider {...settings} className="slider-products">
                    {
                        products.map(item => (
                            <AllProductsItem
                                key={item.id}
                                {...item}
                            />
                        ))
                    }
                </Slider>
            </div>
        </section>
    )
}
