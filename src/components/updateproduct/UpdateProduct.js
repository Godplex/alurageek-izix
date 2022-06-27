import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "../../hooks/useForm";
import { Modal, Button } from "react-bootstrap";
import {
  errorAlert
} from "../../alerts/Alerts";
import { updateImage, updateProduct } from "../../firebase/providers";

export const UpdateProduct = ({
  product,
  show,
  handleClose,
  products,
  setProducts
}) => {

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true)

  const [formValues, handleInputChange] = useForm({
    name: product.name ?? "",
    price: product.price ?? "",
    description: product.description ?? "",
    category: product.category ?? "0",
  });

  const { name, price, category, description } = formValues;

  let isMobile = Boolean(
    navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const removeFile = () => () => {
    setFiles([]);
  };

  const thumbs = files.map((file) => (
    <div key={file.name} className="col-7">
      <img
        src={file.preview}
        alt={file.name}
        className="img-dropzone-product"
      />
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      formValues.name &&
      formValues.price &&
      formValues.description &&
      formValues.category != 0
    ) {
      updateProduct(formValues, product.id, products, setProducts);
    } else {
      console.log(product)
      errorAlert("Todos los campos son obligatorios!");
    }
  };

  const onSubmitImage = (e) => {
    e.preventDefault();

    if (
      files.length > 0
    ) {
      updateImage(files[0], product.imageRef, product.id, products, setProducts, handleClose2, setFiles)
    } else {
      errorAlert("No hay una imagen para subir!");
    }

  }

  return (
    <Modal
      size="lg"
      scrollable
      centered
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Actualizar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-6 col-md-5 col-lg-3">
            <div className="position-relative">
              <img
                src={product.imageUrl}
                className="item-img-product rounded-circle"
              />
              <Button variant="primary" onClick={handleShow2} className="btn btn-primary position-absolute bottom-0 end-0 rounded-pill" style={{ width: '51px', height: '51px' }}>
                <i className="fa-solid fa-camera fa-xl"></i>
              </Button>

              <Modal
                show={show2}
                onHide={handleClose2}
                size="lg"
                scrollable
                centered>
                <Modal.Header closeButton>
                  <Modal.Title>Actualizar imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="col-md-12">
                    <section>
                      <div
                        {...getRootProps({ className: "dropzone" })}
                        role="button"
                      >
                        <input {...getInputProps()} />
                        {files.length <= 0 ? (
                          <div className="text-center">
                            {!isMobile ? (
                              <div>
                                <i className="fa-solid fa-image fa-3x"></i>
                                <p className="pt-3 m-0">
                                  Arrastre para agregar una imagen para el producto
                                </p>
                              </div>
                            ) : (
                              <div>
                                <i className="fa-solid fa-plus fa-3x"></i>
                                <p className="pt-3 m-0">
                                  Agregar una imagen para el producto
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="row d-flex justify-content-center">
                            {thumbs}
                          </div>
                        )}
                      </div>
                      <div className="d-flex justify-content-end pt-1">
                        <button
                          type="button"
                          className="btn btn-danger btn-sm rounded"
                          onClick={removeFile()}
                          disabled={files.length == 0}
                        >
                          Eliminar <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </section>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button type="submit" onClick={onSubmitImage} className="btn btn-primary">
                    Actualizar imagen
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
        <div className="col-12 mt-4">
          <div className="form-floating mb-3">
            <input
              type="name"
              name="name"
              className="form-control"
              id="floatingInputProduct"
              placeholder="Nombre del producto"
              maxLength={20}
              value={name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="floatingInputProduct">Nombre del producto</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              name="price"
              className="form-control"
              id="floatingInputNumber"
              placeholder="Precio del producto"
              min={0}
              value={price}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="floatingInputNumber">Precio del producto</label>
          </div>
          <div className="form-floating mb-3">
            <select
              className="form-select"
              name="category"
              value={category}
              onChange={handleInputChange}
              id="floatingSelect"
            >
              <option value="0" disabled>
                Seleccione una categoria
              </option>
              <option value="Star Wars">Star Wars</option>
              <option value="Consolas">Consolas</option>
              <option value="Diversos">Diversos</option>
            </select>
            <label htmlFor="floatingSelect">Categoria del producto</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              type="text"
              name="description"
              className="form-control"
              placeholder="Descripcion del producto"
              id="floatingTextareaDescritpion"
              style={{ height: 100 }}
              maxLength={150}
              value={description}
              onChange={handleInputChange}
              required
            ></textarea>
            <label htmlFor="floatingTextareaDescritpion">
              Descripcion del producto
            </label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="submit" onClick={onSubmit} className="btn btn-primary">
          Actualizar producto
        </button>
      </Modal.Footer>
    </Modal>
  );
};
