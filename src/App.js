import { HashRouter } from "react-router-dom"
import { AppRouter } from "./routers/AppRouter"
import ScrollToTop from './utils/ScrollToTop';

export const App = () => {

  return (
    <HashRouter>
      <ScrollToTop />
      <AppRouter />
    </HashRouter>
  )
}
