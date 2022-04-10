import React from 'react'

export const AllProductsItem = ({ name, image }) => {
    return (
        <div className="px-2 py-4 product">
            <img src={image} className="w-100" alt={name} />
            <h6 className="mt-3 mb-2 text-truncate">{name}</h6>
            <p className="m-0 fw-bolder">$ 60.00</p>
            <i className="fa-solid fa-trash delete text-white"></i>
            <i className="fa-solid fa-pen edit text-white"></i>
        </div>
    )
}
