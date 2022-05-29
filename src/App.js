import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { HashRouter } from "react-router-dom"
import { auth } from "./firebaseconf";
import { LoadingPage } from "./pages/loading/LoadingPage";
import { AppRouter } from "./routers/AppRouter"
import ScrollToTop from './utils/ScrollToTop';

export const App = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      setIsLoading(false);
      console.log(auth.currentUser);
    });
  }, []);


  return (
    <HashRouter>
      <ScrollToTop />
      {
        (isLoading)
          ?
          <LoadingPage />
          :
          <AppRouter />
      }
    </HashRouter>
  )
}
