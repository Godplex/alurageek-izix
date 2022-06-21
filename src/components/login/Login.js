import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { errorAlert } from "../../alerts/Alerts";
import { auth } from "../../firebase/firebaseconf";
import { loginUser } from "../../firebase/providers";
import { onAuthStateChanged } from "firebase/auth";
import { useForm } from "../../hooks/useForm";

export const Login = () => {
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  let navigate = useNavigate();

  useEffect(() => {
    setToPattern(pattern.test(formValues.email));
  }, [formValues.email]);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      navigate("/");
    }
  });

  const pattern = new RegExp(
    '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()[]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  );

  const [toPattern, setToPattern] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      if (pattern.test(email)) {
        loginUser(email, password).then((res) => res && navigate("/"));
      } else {
        errorAlert("El correo electrónico no es válido!");
      }
    } else {
      errorAlert("Todos los campos son obligatorios!");
    }
  };

  return (
    <section className="py-5 bg-secondary">
      <div className="container py-2">
        <div className="d-md-flex flex-column justify-content-center align-items-center">
          <form className="col-md-6 col-lg-5 text-center" onSubmit={onSubmit}>
            <h5 className="fw-bolder mb-3">Iniciar Sesión</h5>
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                className={`form-control ${
                  !toPattern && email.length > 0 && "is-invalid"
                }`}
                id="floatingInputEmail"
                placeholder="Escriba su correo electronico"
                value={email}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="floatingInputEmail">
                Escriba su correo electronico
              </label>
              <div className="invalid-feedback">
                <small>
                  Ingrese una dirección de correo electronico valida.
                </small>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                id="floatingInputPassword"
                placeholder="Escriba su contraseña"
                value={password}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="floatingInputPassword">
                Escriba su contraseña
              </label>
            </div>
            <button
              className="btn btn-primary py-3 col-5 col-lg-12"
              type="submit"
            >
              Entrar
            </button>
          </form>
          <div className="text-center mt-4">
            <Link
              to="/resetPassword"
              className="text-primary text-decoration-none"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <p className="mb-0">o</p>
            <Link
              to="/createAccount"
              className="text-primary text-decoration-none"
            >
              ¿No tienes una cuenta?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
