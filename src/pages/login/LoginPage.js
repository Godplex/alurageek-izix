import React from 'react'
import { Contact } from '../../components/contact/Contact'
import { Footer } from '../../components/footer/Footer'
import { Login } from '../../components/login/Login'
import { Menu } from '../../components/menu/Menu'

export const LoginPage = () => {
    return (
        <>
            <Menu />
            <Login/>
            <Contact />
            <Footer />
        </>
    )
}
