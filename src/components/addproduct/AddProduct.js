import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import { storage } from '../../firebaseconf';

export const AddProduct = () => {

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

    const [toCreate, setToCreate] = useState({
        product: '',
        price: '',
        category: '0',
        description: ''
    });

    const resetForm = () => {
        setFiles([]);
        setToCreate({
            product: '',
            price: '',
            category: '0',
            description: ''
        });
    };

    const handleChange = (e) => {
        setToCreate({ ...toCreate, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(toCreate);

        if (files.length > 0 && toCreate.product && toCreate.price && toCreate.description && toCreate.category != 0) {

            const storageRef = ref(storage, 'images/' + files[0].name);

            uploadBytes(storageRef, files[0]).then((snapshot) => {
                console.log(snapshot);

                getDownloadURL(storageRef)
                    .then((url) => {
                        console.log(url)
                    })
                    .catch(({ code }) => {
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

            }).catch(({ code }) => {
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

            resetForm();

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Su producto ha sido creado con existo.',
                showConfirmButton: false,
                timer: 1500
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Los campos no pueden estar vacios.',
            })
        }

    };

    return (
        <section className="py-5 bg-secondary">
            <div className="container py-2">
                <div className="d-md-flex justify-content-center">
                    <div className="col-lg-7">
                        <h3 className="fw-bolder">Agregar nuevo producto</h3>
                        <form className="row d-flex align-items-center pt-3" onSubmit={onSubmit}>
                            <div className="col-md-5 col-lg-7">
                                <section>
                                    <div className="d-flex justify-content-end">
                                        <button type="button" className="btn btn-danger btn-sm rounded" onClick={removeFile()} disabled={files.length == 0}>
                                            Eliminar <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                    <div {...getRootProps({ className: 'dropzone' })} role="button">
                                        <input {...getInputProps()} />
                                        {
                                            (files.length <= 0)
                                                ?
                                                <div className="text-center">
                                                    {
                                                        (!isMobile)
                                                            ?
                                                            <div>
                                                                <i className="fa-solid fa-image fa-3x"></i>
                                                                <p className="pt-3 m-0">Arrastre para agregar una imagen para el producto</p>
                                                            </div>
                                                            :
                                                            <div>
                                                                <i className="fa-solid fa-plus fa-3x"></i>
                                                                <p className="pt-3 m-0">Agregar una imagen para el producto</p>
                                                            </div>
                                                    }
                                                </div>
                                                :
                                                <div className="row d-flex justify-content-center">
                                                    {thumbs}
                                                </div>
                                        }
                                    </div>
                                </section>
                            </div>
                            <div className="col-md-5 col-lg-5 d-none d-md-block">
                                <div className="row d-flex align-items-center">
                                    <div className="col-1 ps-0 text-center">
                                        O
                                    </div>
                                    <div className="col-10 p-0">
                                        <button type="button" className="btn btn-outline-primary py-3 w-100">
                                            {
                                                (!isMobile)
                                                    ?
                                                    <p className="m-0">Busque en su computadora</p>
                                                    :
                                                    <p className="m-0">Busque en su dispositivo</p>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-4">
                                <div className="form-floating mb-3">
                                    <input type="text" name="product" className="form-control" id="floatingInputProduct" placeholder="Nombre del producto" maxLength={20} value={toCreate.product} onChange={handleChange} required />
                                    <label htmlFor="floatingInputProduct">Nombre del producto</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="number" name="price" className="form-control" id="floatingInputNumber" placeholder="Precio del producto" min={0} value={toCreate.price} onChange={handleChange} required />
                                    <label htmlFor="floatingInputNumber">Precio del producto</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select className="form-select" name="category" value={toCreate.category} onChange={handleChange} id="floatingSelect">
                                        <option value="0" disabled>Seleccione una categoria</option>
                                        <option value="1">Star Wars</option>
                                        <option value="2">Consolas</option>
                                        <option value="3">Diversos</option>
                                    </select>
                                    <label htmlFor="floatingSelect">Categoria del producto</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea type="text" name="description" className="form-control" placeholder="Descripcion del producto" id="floatingTextareaDescritpion" style={{ height: 100 }} maxLength={150}
                                        value={toCreate.description} onChange={handleChange} required></textarea>
                                    <label htmlFor="floatingTextareaDescritpion">Descripcion del producto</label>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 py-3 mt-3">Agregar producto</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
