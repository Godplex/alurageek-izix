import { useParams } from 'react-router-dom';
import { categoryProducts } from '../../assets/data/products';
import { CarouselProducts } from '../../components/carousel-products/CarouselProducts';
import { Product } from '../../components/product/Product';

export const ProductPage = () => {

    const { productId } = useParams();
    const productsCategory = categoryProducts.map(({ products }) => products);
    const myArray = productsCategory[0].concat(productsCategory[1], productsCategory[2]);
    const products = myArray.filter((obj) => obj.id != productId);

    return (
        <>
            <Product />
            <CarouselProducts title="productos similares" products={products} />
        </>
    )
}
