import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React from 'react'
import Swal from 'sweetalert2';
import { db, storage } from '../../firebaseconf';

export const AllProductsItem = ({ product, imageUrl, price, id, imageRef }) => {

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const deleteProduct = async (id, imageRef) => {
        
        Swal.fire({
            title: '¿Esta seguro?',
            text: "!No podra deshacer los cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '!Si, eliminar!',
            cancelButtonText: 'Cancelar',
        }).then((result) => {

            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Cargando...',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                deleteImage(imageRef, id);
            }
        })
    }

    const deleteImage = async (imageRef, id) => {
        const desertRef = ref(storage, imageRef);

        await deleteObject(desertRef).then(() => {
            deleteData(id);
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

    const deleteData = async (id) => {
        await deleteDoc(doc(db, "products", id))
            .then(() => {
                Swal.close();
                Swal.fire(
                    '!Eliminado!',
                    'El producto ha sido eliminado',
                    'success'
                )
            })
            .catch(({ code }) => {
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

    return (
        <div className="px-2 py-4 product">
            <img src={imageUrl} className="item-img-product" alt={product} />
            <h6 className="mt-3 mb-2 text-truncate">{product}</h6>
            <p className="m-0 fw-bolder">{formatter.format(price)}</p>
            <button className="btn btn-primary delete rounded-circle" onClick={() => { deleteProduct(id, imageRef) }}>
                <i className="fa-solid fa-trash"></i>
            </button>
            <button className="btn btn-primary edit rounded-circle">
                <i className="fa-solid fa-pen text-white"></i>
            </button>
        </div>
    )
}
