import React from 'react'
import { Link } from 'react-router-dom'

export const ProductItem = ({ id, name, imageUrl, title, price }) => {

    let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <div className="px-2 pb-3">
            <img src={imageUrl} className="w-100" alt={name} />
            <h6 className="mt-3 mb-2 text-truncate">{name}</h6>
            <p className="m-0 fw-bolder">{formatter.format(price)}</p>
            <Link to={`/admin/category/${title}/product/${id}`} className="text-decoration-none text-primary fw-bolder">Ver producto</Link>
        </div>
    )
}

