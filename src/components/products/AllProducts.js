import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick/lib/slider';
import { AllProductsItem } from './AllProductsItem';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebaseconf';
import { PropagateLoader } from 'react-spinners';
import logo from '../../assets/logo.png';

export const AllProducts = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getDocs(collection(db, "products"))
            .then((querySnapshot) => {
                const newUserDataArray = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setProducts(newUserDataArray);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Failed to retrieve data", err);
            });
    }, [products]);

    var settings = {
        arrows: false,
        dots: false,
        infinite: false,
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
                }
            },
        ]
    };

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
                {
                    (!isLoading)
                        ?
                        (products.length > 0)
                            ?
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
                            :
                            <div className='d-flex flex-column justify-content-center align-items-center py-5 my-5'>
                                <p className="display-6 m-0 text-center">No hay productos disponibles.</p>
                            </div>
                        :
                        <div className="d-flex flex-column justify-content-center align-items-center py-5 my-5">
                            <img src={logo} alt="logo" className="col-xl-1 col-lg-2 col-md-3 col-6" />
                            <PropagateLoader color={"#2A7AE4"} />
                        </div>
                }
            </div>
        </section>
    )
}
