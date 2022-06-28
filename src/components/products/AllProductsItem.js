import { useState } from "react";
import { UpdateProduct } from "../updateproduct/UpdateProduct";
import { Button } from "react-bootstrap";
import { deleteProduct } from "../../firebase/providers";
import { Skeleton } from '@mui/material';
import { useResizeDetector } from "react-resize-detector";

export const AllProductsItem = ({ product, products, setProducts }) => {

  const [loadImage, setLoadImage] = useState(false);

  const handleImageLoaded = () => {
    setLoadImage(true);
  }

  const { width, ref } = useResizeDetector();

  let imageStyle = { width: '100%', height: width, objectFit: 'cover' };

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
        <div ref={ref}>
          {
            (!loadImage)
            &&
            <Skeleton variant="rectangular" animation="wave" width={width} height={width} />
          }
          <img src={imageUrl} style={imageStyle} alt={name} onLoad={handleImageLoaded} />
          <h6 className="mt-3 mb-2 text-truncate">{name}</h6>
          <p className="m-0 fw-bolder">{formatter.format(price)}</p>
          {
            (loadImage)
            &&
            <>
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
            </>
          }
        </div>
      </div>
      {
        (show)
        &&
        <UpdateProduct
          product={product}
          show={show}
          handleClose={handleClose}
          products={products}
          setProducts={setProducts}
        />
      }
    </>
  );
};
