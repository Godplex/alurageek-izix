import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import firebaseApp from '../../firebaseconf';
const auth = getAuth(firebaseApp);
auth.languageCode = 'es';

export const ResetPasswordPage = () => {

    let navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (userFirebase) => {
            if (userFirebase) {
                navigate('/');
            }
        });
    }, []);

    const resetPassword = async (email) => {
        Swal.fire({
            title: 'Cargando...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        await sendPasswordResetEmail(auth, email)
            .then(() => {
                clearState();
                Swal.close();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Revisa tu correo electronico!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(({ code }) => {
                Swal.close();
                switch (code) {
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
    };

    const [toLogin, setToLogin] = useState(initialState);
    const [toPattern, setToPattern] = useState(false);

    const clearState = () => {
        setToLogin({ ...initialState });
    };

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            setToPattern(pattern.test(e.target.value));
        }
        setToLogin({ ...toLogin, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (toLogin.email) {

            if (pattern.test(toLogin.email)) {
                resetPassword(toLogin.email);
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
                        <h5 className="fw-bolder">Restablecer contraseña</h5>
                        <div className="form-row">
                            <input type="email" name="email" className={`form-control form-control-lg py-3 mt-3 ${(!toPattern && toLogin.email.length > 0) ? 'is-invalid' : ''}`}
                                value={toLogin.email} onChange={handleChange} required />
                            <label alt="Label" data-placeholder="Escriba su correo electronico"></label>
                        </div>
                        <button className="btn btn-primary py-3 col-5 col-lg-12" type="submit">Enviar</button>
                        {
                            (!toPattern && toLogin.email.length > 0)
                            &&
                            <div className="alert alert-dismissible alert-danger mt-4">
                                Ingrese una dirección de correo electronico valida.
                            </div>
                        }
                    </form>
                    <div className="text-center mt-4">
                        <button onClick={() => navigate(-1)} className="btn text-primary">Regresar</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
