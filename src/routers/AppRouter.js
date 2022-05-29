import { onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Contact } from '../components/contact/Contact'
import { Footer } from '../components/footer/Footer'
import { Menu } from '../components/menu/Menu'
import { auth } from '../firebaseconf'
import { CreateAccountPage } from '../pages/createaccount/CreateAccountPage'
import { HomePage } from '../pages/home/HomePage'
import { LoginPage } from '../pages/login/LoginPage'
import { NotFoundPage } from '../pages/notfound/NotFoundPage'
import { ResetPasswordPage } from '../pages/resetpassword/ResetPasswordPage'
import { DashboardPrivateRoutes } from './DashboardPrivateRoutes'
import PrivateRoute from './PrivateRoute'

export const AppRouter = () => {

    const [user, setUser] = useState(null);

    onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) {
            setUser(userFirebase);
        } else {
            setUser(null);
        }
    });

    return (
        <>
            <Menu />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/createAccount" element={<CreateAccountPage />} />
                <Route path="/resetPassword" element={<ResetPasswordPage />} />
                {/* Private Route */}
                <Route
                    path="/admin/*"
                    element={
                        <PrivateRoute user={user}>
                            <DashboardPrivateRoutes />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Contact />
            <Footer />
        </>
    )
}
