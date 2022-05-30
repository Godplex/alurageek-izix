import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Contact } from '../components/contact/Contact'
import { Footer } from '../components/footer/Footer'
import { Menu } from '../components/menu/Menu'
import { auth } from '../firebaseconf'
import { CreateAccountPage } from '../pages/createaccount/CreateAccountPage'
import { HomePage } from '../pages/home/HomePage'
import { LoadingPage } from '../pages/loading/LoadingPage'
import { LoginPage } from '../pages/login/LoginPage'
import { NotFoundPage } from '../pages/notfound/NotFoundPage'
import { ResetPasswordPage } from '../pages/resetpassword/ResetPasswordPage'
import { DashboardPrivateRoutes } from './DashboardPrivateRoutes'
import PrivateRoute from './PrivateRoute'

export const AppRouter = () => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
            setIsLoading(false);
            if (userFirebase) {
                setUser(userFirebase);
            } else {
                setUser(null);
            }
        });
        // to fix:
        return () => { unsubscribe() };
    }, []);

    return (
        <>
            {!isLoading && <Menu />}
            <Routes >
                <Route path="/" element={(isLoading) ? <LoadingPage /> : <HomePage />} />
                <Route path="/login" element={(isLoading) ? <LoadingPage /> : <LoginPage />} />
                <Route path="/createAccount" element={(isLoading) ? <LoadingPage /> : <CreateAccountPage />} />
                <Route path="/resetPassword" element={(isLoading) ? <LoadingPage /> : <ResetPasswordPage />} />
                {/* Private Route */}
                <Route
                    path="/admin/*"
                    element={
                        (isLoading)
                            ?
                            <LoadingPage />
                            :
                            <PrivateRoute user={user}>
                                <DashboardPrivateRoutes />
                            </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {!isLoading && <Contact />}
            {!isLoading && <Footer />}
        </>
    )
}
