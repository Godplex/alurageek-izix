import React from 'react'
import { useParams } from 'react-router-dom';
import { categoryProducts } from '../../assets/data/products';

export const Product = () => {

    const { title, productId } = useParams();
    const category = categoryProducts.find((category) => category.title === title);
    let myArray;
    if (title === "productos similares") {
        const productsCategory = categoryProducts.map(({ products }) => products);
        myArray = productsCategory[0].concat(productsCategory[1], productsCategory[2]);
    }
    const product = (category) ? category.products.find((product) => product.id == productId) : null;

    return (
        (category && product)
            ?
            <section className="py-md-5 pb-4 bg-secondary">
                <div className="container py-md-2">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-4 col-lg-6 text-center px-md-3 px-0">
                            <img src={product.image} alt="imagen" className="img-product" />
                        </div>
                        <div className="col-md-8 col-lg-6">
                            <h1 className="fw-bolder pt-3 display-4">{product.name}</h1>
                            <p className="fw-bolder">$ 60.00</p>
                            <p className="w-100">
                                Voluptas voluptatum quibusdam similique, class debitis alias maecenas eveniet ridiculus,
                                facilis fusce! Ullam conubia? Sociis, minima malesuada habitasse distinctio sequi aliqua malesuada.
                                Quisque deleniti proin expedita, aliquid litora. Iste recusandae? Commodo,
                                quia ridiculus doloribus vero dictum? Penatibus donec placeat faucibus, dolorum do. Animi porta anim magnam
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            :
            (title === "productos similares" && myArray[productId - 1])
                ?
                <section className="py-md-5 pb-4 bg-secondary">
                    <div className="container py-md-2">
                        <div className="row d-flex align-items-center">
                            <div className="col-md-4 col-lg-6 text-center px-md-3 px-0">
                                <img src={myArray[productId - 1].image} alt="imagen" className="img-product" />
                            </div>
                            <div className="col-md-8 col-lg-6">
                                <h1 className="fw-bolder pt-3 display-4">{myArray[productId - 1].name}</h1>
                                <p className="fw-bolder">$ 60.00</p>
                                <p className="w-100">
                                    Voluptas voluptatum quibusdam similique, class debitis alias maecenas eveniet ridiculus,
                                    facilis fusce! Ullam conubia? Sociis, minima malesuada habitasse distinctio sequi aliqua malesuada.
                                    Quisque deleniti proin expedita, aliquid litora. Iste recusandae? Commodo,
                                    quia ridiculus doloribus vero dictum? Penatibus donec placeat faucibus, dolorum do. Animi porta anim magnam
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                :
                <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                </main>
    )
}
