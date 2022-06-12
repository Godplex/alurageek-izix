import { collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import { db, storage } from '../../firebaseconf';
import { useForm } from '../../hooks/useForm';
import { Button, Modal } from 'react-bootstrap';

export const UpdateProduct = ({ product, show, handleClose }) => {

    const [formValues, handleInputChange] = useForm({
        name: product.name,
        price: product.price ?? '',
        description: product.description ?? '',
        category: product.category ?? '0'
    });

    const { name, price, category, description } = formValues;

    let isMobile = Boolean(navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ));

    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, []);

    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    });

    const removeFile = () => () => {
        setFiles([]);
    }

    const thumbs = files.map(file => (
        <div key={file.name} className="col-7">
            <img
                src={file.preview}
                alt={file.name}
                className="img-dropzone-product"
            />
        </div>
    ));

    // clean up
    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const uploadImage = (storageRef, file) => {
        uploadBytes(storageRef, file).then((resp) => {

            console.log(resp)
            getUrlImage(storageRef);

        }).catch(({ code }) => {
            Swal.close();
            switch (code) {
                default:
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: code,
                    });
                    break;
            }
        });
    }

    const getUrlImage = async (storageRef) => {
        getDownloadURL(storageRef)
            .then((url) => {

                console.log(storageRef);

                uploadData(url, storageRef);

            })
            .catch(({ code }) => {
                Swal.close();
                switch (code) {
                    case 'storage/object-not-found':
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Archivo no encontrado!',
                        });
                        break;
                    case 'storage/unauthorized':
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No tiene permiso para realizar esta acción!',
                        });
                        break;
                    case 'storage/canceled':
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Subida cancelada, intentelo de nuevo!',
                        });
                        break;
                    case 'storage/unknown':
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Error desconocido!',
                        });
                        break;
                    default:
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: code,
                        });
                        break;
                }
            });
    }

    const uploadData = async (url, storageRef) => {

        const newProductRef = doc(collection(db, "products"));

        const data = {
            product: name,
            price: price,
            category: category,
            description: description,
            imageUrl: url || '',
            imageRef: storageRef.fullPath,
            productRef: newProductRef.id
        }

        console.log(newProductRef);
        console.log(data);

        await setDoc(doc(db, "products", newProductRef.id), data)
            .then((resp) => {
                console.log(resp)
            }).catch(({ code }) => {
                Swal.close();
                console.log(code)
            });

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Su producto ha sido creado con existo.',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (files.length > 0 && formValues.product && formValues.price && formValues.description && formValues.category != 0) {

            const storageRef = ref(storage, 'images/alura-geek-izix-' + Math.floor(Math.random() * Date.now()) + "." + files[0].name.split('.').pop());

            //uploadImage(storageRef, files[0]);

            Swal.fire({
                title: 'Cargando...',
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Los campos no pueden estar vacios.',
            })
        }

    };

    return (
        <Modal size="lg"
            scrollable
            centered
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            animation={false}>
            <form>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="col-6 col-md-5 col-lg-3">
                            <img src={product.imageUrl} className="item-img-product rounded-circle" />
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <div className="form-floating mb-3">
                            <input type="name" name="name" className="form-control" id="floatingInputProduct" placeholder="Nombre del producto" maxLength={20} value={name} onChange={handleInputChange} required />
                            <label htmlFor="floatingInputProduct">Nombre del producto</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number" name="price" className="form-control" id="floatingInputNumber" placeholder="Precio del producto" min={0} value={price} onChange={handleInputChange} required />
                            <label htmlFor="floatingInputNumber">Precio del producto</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select className="form-select" name="category" value={category} onChange={handleInputChange} id="floatingSelect">
                                <option value="0" disabled>Seleccione una categoria</option>
                                <option value="Star Wars">Star Wars</option>
                                <option value="Consolas">Consolas</option>
                                <option value="Diversos">Diversos</option>
                            </select>
                            <label htmlFor="floatingSelect">Categoria del producto</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea type="text" name="description" className="form-control" placeholder="Descripcion del producto" id="floatingTextareaDescritpion" style={{ height: 100 }} maxLength={150}
                                value={description} onChange={handleInputChange} required></textarea>
                            <label htmlFor="floatingTextareaDescritpion">Descripcion del producto</label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary">Actualizar producto</button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
