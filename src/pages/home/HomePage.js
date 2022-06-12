import { categoryProducts } from '../../assets/data/products'
import { Banner } from '../../components/banner/Banner'
import { CarouselProducts } from '../../components/carousel-products/CarouselProducts'

export const HomePage = () => {
    return (
        <>
            <Banner />
            {
                categoryProducts.map(item => (
                    <CarouselProducts
                        key={item.title}
                        {...item}
                    />
                ))
            }
        </>
    )
}
