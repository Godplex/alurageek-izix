import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../components/product/Product';
import { getSimilarProducts } from '../../firebase/providers';
import { SimiliarProducts } from './../../components/carousel-products/SimiliarProducts';
import { useLocation } from 'react-router-dom';

export const ProductPage = () => {

    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        getSimilarProducts(productId, setProducts, setIsLoading, title);
    }, [location]);

    const { title, productId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    return (
        <>
            <Product />
            <SimiliarProducts products={products} isLoading={isLoading} title={title} />
        </>
    )
}
