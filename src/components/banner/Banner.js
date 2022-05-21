import { Link } from "react-router-dom"

export const Banner = () => {
    return (
        <section id="banner">
            <div className="banner d-flex align-items-end">
                <div className="container text-white pb-4 pb-lg-5">
                    <h1 className="display-4 fw-bold">Febrero Promocional</h1>
                    <p className="h5 m-0 pt-1 pb-3">Productos seleccionados con 33% de descuento</p>
                    <Link to="admin/products" className="btn btn-primary px-4 py-2">Ver consolas</Link>
                </div>
            </div>
        </section>
    )
}
