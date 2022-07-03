import { Link, useNavigate } from "react-router-dom";
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
  const [search, setSearch] = useState(null);

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase);
    } else {
      setUser(null);
    }
  });

  useEffect(() => {
    getProducts(setProducts, setIsLoading);
  }, [search])

  const handleOnSelect = (item) => {
    window.location.href = `/alurageek-izix/#/admin/category/${item.category}/product/${item.id}`;
  }

  const handleOnSearch = (string) => {
    setSearch(string)
  }

  const formatResult = (item) => {
    return (
      <div className="row">
        <div className="col-2 col-md-3 col-lg-2">
          <div className="ratio ratio-1x1" style={{ objectFit: 'cover' }}>
            <img src={item.imageUrl} alt={item.name} className="w-100" />
          </div>
        </div>
        <div className="col-10 col-md-7 col-lg-10">
          <span className="d-block float-left"><b>Nombre:</b> {item.name}</span>
          <span className="d-block float-left"><b>Precio:</b> {formatter.format(item.price)}</span>
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
        <div className="col-md-7 col-lg-5 me-auto ms-2 d-none d-sm-block">
          <ReactSearchAutocomplete
            items={products}
            styling={{ zIndex: 1000 }}
            onSelect={handleOnSelect}
            onSearch={handleOnSearch}
            inputDebounce={500}
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
