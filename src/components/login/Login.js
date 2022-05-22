import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { auth } from '../../firebaseconf';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {

    let navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (userFirebase) => {
            if (userFirebase) {
                navigate('/');
            }
        });
    }, []);

    const loginUser = async (email, password) => {
        Swal.fire({
            title: 'Cargando...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                Swal.close();
                navigate('/');
            }).catch(({ code }) => {
                Swal.close();
                switch (code) {
                    case "auth/user-not-found":
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Esta cuenta no existe!',
                        });
                        break;
                    case "auth/wrong-password":
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Usuario o contraseña incorrectos!',
                        });
                        break;
                    case "auth/too-many-requests":
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Demasiadas peticiones, espere un momento!',
                        });
                        break;
                    default:
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: code,
                        });
                        break;
                }
            });
    }

    const pattern = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\[\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

    const initialState = {
        email: '',
        password: '',
    };

    const [toLogin, setToLogin] = useState(initialState);
    const [toPattern, setToPattern] = useState(false);

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setToPattern(pattern.test(e.target.value));
        }
        setToLogin({ ...toLogin, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (toLogin.email && toLogin.password) {

            if (pattern.test(toLogin.email)) {
                loginUser(toLogin.email, toLogin.password);
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'El email no es válido',
                    icon: 'error',
                });
            }

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Los campos no pueden estar vacios.',
            })
        }

    };

    return (
        <section className="py-5 bg-secondary">
            <div className="container py-2">
                <div className="d-md-flex flex-column justify-content-center align-items-center">
                    <form className="col-md-6 col-lg-5 text-center" onSubmit={onSubmit}>
                        <h5 className="fw-bolder">Iniciar Sesión</h5>
                        <div className="form-row">
                            <input type="email" name="email" className={`form-control form-control-lg py-3 mt-3 ${(!toPattern && toLogin.email.length > 0) ? 'is-invalid' : ''}`}
                                value={toLogin.email} onChange={handleChange} required />
                            <label alt="Label" data-placeholder="Escriba su correo electronico"></label>
                        </div>
                        <div className="form-row">
                            <input type="password" name="password" className="form-control form-control-lg py-3" value={toLogin.password} onChange={handleChange} required />
                            <label alt="Label" data-placeholder="Escriba su contraseña"></label>
                        </div>
                        <button className="btn btn-primary py-3 col-5 col-lg-12" type="submit">Entrar</button>
                        {
                            (!toPattern && toLogin.email.length > 0)
                            &&
                            <div className="alert alert-dismissible alert-danger mt-4">
                                Ingrese una dirección de correo electronico valida.
                            </div>
                        }
                    </form>
                    <div className="text-center mt-4">
                        <Link to="/resetPassword" className="text-primary text-decoration-none">¿Olvidaste tu contraseña?</Link>
                        <p className="mb-0">o</p>
                        <Link to="/createAccount" className="text-primary text-decoration-none">¿No tienes una cuenta?</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
