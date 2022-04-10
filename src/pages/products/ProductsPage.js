import React from 'react'
import { Contact } from '../../components/contact/Contact'
import { Footer } from '../../components/footer/Footer'
import { Menu } from '../../components/menu/Menu'
import { AllProducts } from '../../components/products/AllProducts'

export const ProductsPage = () => {
  return (
    <>
      <Menu />
      <AllProducts/>
      <Contact />
      <Footer />
    </>
  )
}
