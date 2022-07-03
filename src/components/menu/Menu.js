import { Link, Navigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseconf";
import { getProducts, logout } from "../../firebase/providers";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export const Menu = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase);
    } else {
      setUser(null);
    }
  });

  useEffect(() => {
    getProducts(setProducts, setIsLoading);
  }, [])

  const handleOnSelect = (item) => {
    window.location.href = `/alurageek-izix/#/admin/category/${item.category}/product/${item.id}`;
  }

  const formatResult = (item) => {
    return (
      <div className="row">
        <div className="col-2">
          <img src={item.imageUrl} alt={item.name} className="w-100" />
        </div>
        <div className="col-10">
          <span style={{ display: 'block', textAlign: 'left' }}>Nombre: {item.name}</span>
          <span style={{ display: 'block', textAlign: 'left' }}>Precio: {item.price}</span>
        </div>
      </div>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container py-2">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="col-5 me-auto ms-2 d-none d-sm-block">
          <ReactSearchAutocomplete
            items={products}
            styling={{ zIndex: 1000 }}
            onSelect={handleOnSelect}
            placeholder="¿Que deseas buscar?"
            showNoResultsText="Sin resultados"
            autoFocus
            formatResult={formatResult}
          />
        </div>
        {user ? (
          <button
            className="btn btn-primary d-flex px-4 px-lg-5 py-2"
            onClick={() => logout()}
          >
            Cerrar sesión
          </button>
        ) : (
          <Link
            to="/login"
            className="btn btn-outline-primary d-flex px-4 px-lg-5 py-2"
          >
            Login
          </Link>
        )}
        <i className="fa-solid fa-magnifying-glass fa-lg fa-fw icon d-sm-block d-md-none"></i>
      </div>
    </nav>
  );
};
