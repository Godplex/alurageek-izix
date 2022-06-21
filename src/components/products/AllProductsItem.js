import { useState } from "react";
import { UpdateProduct } from "../updateproduct/UpdateProduct";
import { Button } from "react-bootstrap";
import { deleteProduct } from "../../firebase/providers";

export const AllProductsItem = ({ product, products, setProducts }) => {
  const { id, name, price, imageUrl, imageRef } = product;

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="px-2 py-4 product">
        <img src={imageUrl} className="item-img-product" alt={name} />
        <h6 className="mt-3 mb-2 text-truncate">{name}</h6>
        <p className="m-0 fw-bolder">{formatter.format(price)}</p>
        <button
          className="btn btn-primary delete rounded-circle"
          onClick={() => {
            deleteProduct(id, imageRef, products, setProducts);
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
        <Button
          variant="primary"
          onClick={handleShow}
          className="edit rounded-circle"
        >
          <i className="fa-solid fa-pen text-white"></i>
        </Button>
      </div>
      <UpdateProduct
        product={product}
        show={show}
        handleClose={handleClose}
        products={products}
        setProducts={setProducts}
      />
    </>
  );
};
