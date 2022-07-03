import { Skeleton } from '@mui/material';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useResizeDetector } from "react-resize-detector";

export const ProductItem = ({ id, name, imageUrl, title, price }) => {

    const [loadImage, setLoadImage] = useState(false);

    const handleImageLoaded = () => {
        setLoadImage(true);
    }

    const { width, ref } = useResizeDetector();

    let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <div className="px-2 pb-3">
            <div ref={ref}>
                {
                    (!loadImage)
                    &&
                    <Skeleton variant="rectangular" animation="wave" width={width} height={width} />
                }
                <img src={imageUrl} className={`${!loadImage ? 'd-none':'d-block'}`} style={{ width: '100%', height: width, objectFit: 'cover' }} alt={name} onLoad={handleImageLoaded} />
                <h6 className="mt-3 mb-2 text-truncate">{name}</h6>
                <p className="m-0 fw-bolder">{(price) && formatter.format(price)}</p>
                <Link to={`/admin/category/${title}/product/${id}`} className="text-decoration-none text-primary fw-bolder">Ver producto</Link>
            </div>
        </div>
    )
}

