import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export const Menu = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container py-2">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="logo" className="logo" />
                </Link>
                <div className="col-5 me-auto ms-2 d-none d-sm-block">
                    <div className="Icon-inside">
                        <input type="text" placeholder="¿Que deseas buscar?" className="form-control pe-5 ps-3 search" />
                        <i className="fa-solid fa-magnifying-glass fa-fw"></i>
                    </div>
                </div>
                <Link to="/login" className="btn btn-outline-primary d-flex px-4 px-lg-5 py-2">Login</Link>
                <i className="fa-solid fa-magnifying-glass fa-lg fa-fw icon d-sm-block d-md-none"></i>
            </div>
        </nav >
    )
}
