import React from 'react'

export const AddProduct = () => {

    let isMobile = Boolean(navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ));

    return (
        <section className="py-5 bg-secondary">
            <div className="container py-2">
                <div className="d-md-flex justify-content-center">
                    <div className="col-lg-7">
                        <h3 className="fw-bolder">Agregar nuevo producto</h3>
                        <div className="row d-flex align-items-center pt-3">
                            <div className="col-md-5 col-lg-7">
                                <input type="file" name="file" id="file" className="inputfile" />
                                <label htmlFor="file" className="fw-bolder p-5 text-center">
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
                                </label>
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
                                    <input type="text" required className="form-control form-control-lg py-3" />
                                    <label alt="Label" data-placeholder="Nombre del producto"></label>
                                </div>
                                <div className="form-row">
                                    <input type="number" required className="form-control form-control-lg py-3" />
                                    <label alt="Label" data-placeholder="Precio del producto"></label>
                                </div>
                                <textarea type="text" className="form-control form-control-lg mb-3 pt-3" placeholder="Descripcion del producto" rows={3}></textarea>
                                <button className="btn btn-primary w-100 py-3 mt-3">Agregar producto</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
