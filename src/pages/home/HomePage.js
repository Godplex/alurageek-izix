import { categoryProducts } from '../../assets/data/products'
import { Banner } from '../../components/banner/Banner'
import { CarouselProducts } from '../../components/carousel-products/CarouselProducts'
import { Contact } from '../../components/contact/Contact'
import { Footer } from '../../components/footer/Footer'
import { Menu } from '../../components/menu/Menu'

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
