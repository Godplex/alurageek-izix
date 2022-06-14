import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import { db, storage } from '../../firebaseconf';
import { useForm } from '../../hooks/useForm';

export const AddProduct = () => {

    const [formValues, handleInputChange, reset] = useForm({
        name: '',
        price: '',
        category: '0',
        description: ''
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

        const data = {
            name: name,
            price: price,
            category: category,
            description: description,
            imageUrl: url || '',
            imageRef: storageRef.fullPath,
        }

        await addDoc(collection(db, "products"), data).then(() => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Su producto ha sido creado con existo.',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch(({ code }) => {
            Swal.close();
            console.log(code)
        });

        reset();

    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (files.length > 0 && formValues.name && formValues.price && formValues.description && formValues.category != 0) {

            loadingAlert();

            const storageRef = ref(storage, 'images/alura-geek-izix-' + Math.floor(Math.random() * Date.now()) + "." + files[0].name.split('.').pop());

            uploadImage(storageRef, files[0]);

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Los campos no pueden estar vacios.',
            })
        }

    };


    const loadingAlert = () => {
        Swal.fire({
            title: 'Cargando...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    }
    return (
        <section className="py-5 bg-secondary">
            <div className="container py-2">
                <div className="d-md-flex justify-content-center">
                    <div className="col-lg-7">
                        <h3 className="fw-bolder">Agregar nuevo producto</h3>
                        <form className="row d-flex align-items-center pt-3" onSubmit={onSubmit}>
                            <div className="col-md-12">
                                <section>
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
                                    <div className="d-flex justify-content-end pt-1">
                                        <button type="button" className="btn btn-danger btn-sm rounded" onClick={removeFile()} disabled={files.length == 0}>
                                            Eliminar <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                </section>
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
                                <button type="submit" className="btn btn-primary w-100 py-3 mt-3">Agregar producto</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
