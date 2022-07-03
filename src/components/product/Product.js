import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProductById } from '../../firebase/providers';
import { Skeleton, Typography } from '@mui/material';
import { useResizeDetector } from "react-resize-detector";
import { useLocation } from 'react-router-dom';

export const Product = () => {

    const location = useLocation();

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadImage, setLoadImage] = useState(false);
    const [exits, setExits] = useState(true);

    const handleImageLoaded = () => {
        setLoadImage(true);
    }

    const { width, ref } = useResizeDetector();

    useEffect(() => {
        setIsLoading(true);
        setExits(true);
        getProductById(productId, setProduct, setIsLoading, setExits);
    }, [location])

    let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        (exits)
            ?
            <section className="py-md-5 pb-4 bg-secondary">
                <div className="container py-md-2">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-4 col-lg-6 text-center px-md-3 px-0" ref={ref}>
                            {
                                (width)
                                &&
                                (
                                    (isLoading && !loadImage)
                                        ?
                                        <Skeleton variant="rectangular" animation="wave" width={width} height={width / 1.5} />
                                        :
                                        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: width / 1.5, objectFit: 'cover' }} onLoad={handleImageLoaded} />
                                )
                            }
                        </div>
                        <div className="col-md-8 col-lg-6">
                            {isLoading
                                ?
                                <>
                                    <Typography variant="h1">
                                        <Skeleton variant="text" animation="wave" />
                                    </Typography>
                                    <Skeleton variant="text" width={"25%"} animation="wave" />
                                    <Skeleton variant="text" animation="wave" />
                                    <Skeleton variant="text" animation="wave" />
                                </>
                                :
                                <>
                                    <h1 className="fw-bolder pt-3 display-4">{product.name}</h1>
                                    <p className="fw-bolder">{formatter.format(product.price)}</p>
                                    <p className="w-100">
                                        {
                                            product.description
                                        }
                                    </p>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </section>
            :
            <div className="d-flex flex-column justify-content-center align-items-center py-5 my-5">
                <p className="display-6 m-0 text-center">
                    Este producto no existe.
                </p>
            </div>
    )
}
