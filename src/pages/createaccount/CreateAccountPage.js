import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';
import firebaseApp from '../../firebaseconf';
const auth = getAuth(firebaseApp);
auth.languageCode = 'es';

export const CreateAccountPage = () => {

    let navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (userFirebase) => {
            if (userFirebase) {
                navigate('/');
            }
        });
    }, []);

    const createUser = async (email, password) => {
        Swal.fire({
            title: 'Cargando...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                Swal.close();
                navigate('/');
            }).catch(({ code,message }) => {
                console.log(message);
                Swal.close();
                switch (code) {
                    case "auth/weak-password":
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Contraseña demasiado corta!',
                        });
                        break;
                    case "auth/email-already-in-use":
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Este correo electronico ya esta en uso!',
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
                createUser(toLogin.email, toLogin.password);
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
                        <h5 className="fw-bolder">Crear cuenta</h5>
                        <div className="form-row">
                            <input type="email" name="email" className={`form-control form-control-lg py-3 mt-3 ${(!toPattern && toLogin.email.length > 0) ? 'is-invalid' : ''}`}
                                value={toLogin.email} onChange={handleChange} required />
                            <label alt="Label" data-placeholder="Escriba su correo electronico"></label>
                        </div>
                        <div className="form-row">
                            <input type="password" name="password" className="form-control form-control-lg py-3" value={toLogin.password} onChange={handleChange} required />
                            <label alt="Label" data-placeholder="Escriba su contraseña"></label>
                        </div>
                        <button className="btn btn-primary py-3 col-5 col-lg-12" type="submit">Crear</button>
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
                        <Link to="/login" className="text-primary text-decoration-none">Ya tengo una cuenta</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
