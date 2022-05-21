import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useState } from 'react';
import firebaseApp from '../../firebaseconf';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth(firebaseApp);

export const Menu = () => {

    const [user, setUser] = useState(null);

    onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) {
            setUser(userFirebase);
        } else {
            setUser(null);
        }
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container py-2">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="logo" className="logo" />
                </Link>
                <div className="col-5 me-auto ms-2 d-none d-sm-block">
                    <div className="Icon-inside">
                        <input type="search" placeholder="¿Que deseas buscar?" className="form-control pe-5 ps-3 search" />
                        <i className="fa-solid fa-magnifying-glass fa-fw"></i>
                    </div>
                </div>
                {
                    (user)
                        ?
                        <button className="btn btn-primary d-flex px-4 px-lg-5 py-2" onClick={() => signOut(auth)}>Cerrar sesión</button>
                        :
                        <Link to="/login" className="btn btn-outline-primary d-flex px-4 px-lg-5 py-2">Login</Link>
                }
                <i className="fa-solid fa-magnifying-glass fa-lg fa-fw icon d-sm-block d-md-none"></i>
            </div>
        </nav >
    )
}
