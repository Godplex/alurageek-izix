import React from 'react'
import { AddProduct } from '../../components/addproduct/AddProduct'
import { Contact } from '../../components/contact/Contact'
import { Footer } from '../../components/footer/Footer'
import { Menu } from '../../components/menu/Menu'

export const AddProductPage = () => {
    return (
        <>
            <Menu />
            <AddProduct />
            <Contact />
            <Footer />
        </>
    )
}
