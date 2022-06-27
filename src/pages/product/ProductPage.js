import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoryProducts } from '../../assets/data/products';
import { CarouselProducts } from '../../components/carousel-products/CarouselProducts';
import { Product } from '../../components/product/Product';
import { getSimilarProducts } from '../../firebase/providers';

export const ProductPage = () => {

    const { productId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getSimilarProducts(productId, setProducts, setIsLoading);
    }, []);

    return (
        <>
            <Product />
            <CarouselProducts title="productos similares" products={products} />
        </>
    )
}
