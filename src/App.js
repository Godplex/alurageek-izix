import { useState } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { DashboardPrivateRoutes } from "./routers/DashboardPrivateRoutes";
import PrivateRoute from "./routers/PrivateRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseconf";
import { LoginPage } from "./pages/login/LoginPage";
import { NotFoundPage } from "./pages/notfound/NotFoundPage";
import { Menu } from "./components/menu/Menu";
import { Contact } from "./components/contact/Contact";
import { Footer } from "./components/footer/Footer";
import { CreateAccountPage } from "./pages/createaccount/CreateAccountPage";
import { ResetPasswordPage } from "./pages/resetpassword/ResetPasswordPage";

export const App = () => {

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
