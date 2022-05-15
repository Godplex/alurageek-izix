import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';

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

    const removeFile = (file) => () => {
        console.log(file)
        setFiles([]);
    }

    const thumbs = files.map(file => (
        <div key={file.name} className="col-7 position-relative">
            <img
                src={file.preview}
                alt={file.name}
                className="w-100"
            />
            <button onClick={removeFile(file)} className="position-absolute top-0 start-100 translate-middle rounded-circle bg-primary">
                <i className="fa-solid fa-circle-xmark text-white"></i>
            </button>
        </div>
    ));

    // clean up
    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const [toCreate, setToCreate] = useState({
        product: '',
        price: '',
        description: ''
    });

    const resetForm = () => {
        setFiles([]);
        setToCreate({
            product: '',
            price: '',
            description: ''
        });
    };

    const handleChange = (e) => {
        setToCreate({ ...toCreate, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (files.length > 0 && toCreate.product && toCreate.price && toCreate.description) {

            resetForm();

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Su mensaje ha sido enviado.',
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
                                    <div {...getRootProps({ className: 'dropzone' })}>
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
                                                                <i className="fa-solid fa-plus fa-2xl"></i>
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
                                <div className="form-row">
                                    <input type="text" name="product" className="form-control form-control-lg py-3" maxLength={20} value={toCreate.product} onChange={handleChange} />
                                    <label alt="Label" data-placeholder="Nombre del producto"></label>
                                </div>
                                <div className="form-row">
                                    <input type="number" name="price" className="form-control form-control-lg py-3" value={toCreate.price} onChange={handleChange} />
                                    <label alt="Label" data-placeholder="Precio del producto"></label>
                                </div>
                                <textarea type="text" name="description" className="form-control form-control-lg mb-3 pt-3" placeholder="Descripcion del producto" rows={3} maxLength={150}
                                    value={toCreate.description} onChange={handleChange}></textarea>
                                <button type="submit" className="btn btn-primary w-100 py-3 mt-3">Agregar producto</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
