import React, { useState } from 'react'
import Swal from 'sweetalert2';
import firebaseApp from '../../firebaseconf';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(firebaseApp);

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
        .then((resp) => {
            console.log(resp);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            Swal.close();
        });
}

export const Login = () => {

    const pattern = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\[\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

    const [toLogin, setToLogin] = useState({
        email: '',
        password: '',
    });
    const [toPattern, setToPattern] = useState(false);

    const resetForm = () => {
        setToLogin({
            email: '',
            password: '',
        });
    };

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
                resetForm();
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
                <div className="d-md-flex justify-content-center">
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
                                ?
                                <div className="alert alert-dismissible alert-danger mt-4">
                                    Ingrese una dirección de correo electronico valida.
                                </div>
                                :
                                ''
                        }
                    </form>
                </div>
            </div>
        </section>
    )
}
