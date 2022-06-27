import { Banner } from '../../components/banner/Banner'
import { CarouselProducts } from '../../components/carousel-products/CarouselProducts'

export const HomePage = () => {

    const categories = [
        {
            title: 'Star Wars',
        },
        {
            title: 'Consolas',
        },
        {
            title: 'Diversos',
        }
    ]

    return (
        <>
            <Banner />
            {
                categories.map(item => (
                    <CarouselProducts
                        key={item.title}
                        {...item}
                    />
                ))
            }
        </>
    )
}
