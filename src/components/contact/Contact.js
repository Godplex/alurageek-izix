import { useState } from 'react';
import Swal from 'sweetalert2';
import logo from '../../assets/logo.png';

export const Contact = () => {

    const [toSend, setToSend] = useState({
        name: '',
        message: '',
    });

    const resetForm = () => {
        setToSend({
            name: '',
            message: '',
        });
    };

    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (toSend.name && toSend.message) {

            console.log(toSend);

            resetForm();

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Su mensaje ha sido enviado.',
                showConfirmButton: false,
                timer: 1500
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Los campos no pueden estar vacios.',
            })
        }

    };

    return (
        <section className="py-5" id="contact">
            <div className="container">
                <div className="row">
                    <div className="col-md-5 col-lg-66 row">
                        <div className="col-lg-6 text-center text-md-start">
                            <img src={logo} className="logo-contact" />
                        </div>
                        <div className="col-lg-6 text-center text-md-start">
                            <a href="#" className="text-dark text-decoration-none"><p className="my-3">Quienes somos</p></a>
                            <a href="#" className="text-dark text-decoration-none"><p className="my-3">Politica de privacidad</p></a>
                            <a href="#" className="text-dark text-decoration-none"><p className="my-3">Programa de fidelidad</p></a>
                            <a href="#" className="text-dark text-decoration-none"><p className="my-3">Nuestras tiendas</p></a>
                            <a href="#" className="text-dark text-decoration-none"><p className="my-3">Quiero ser franquiciado</p></a>
                            <a href="#" className="text-dark text-decoration-none"><p className="my-3">Anuncie aqui</p></a>
                        </div>
                    </div>
                    <form className="col-md-7 col-lg-6" onSubmit={onSubmit}>
                        <h6 className="fw-bolder mb-3">Hable con nosotros</h6>
                        <div className="form-floating mb-3">
                            <input type="name" name="name" className="form-control" id="floatingInputName" placeholder="Nombre" maxLength={40} value={toSend.name} onChange={handleChange} required />
                            <label htmlFor="floatingInputName">Nombre</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea type="text" name="message" className="form-control" placeholder="Escribe tu mensaje" id="floatingTextareaMessage" style={{ height: 100 }} maxLength={120} value={toSend.message} onChange={handleChange} required></textarea>
                            <label htmlFor="floatingTextareaMessage">Escribe tu mensaje</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar mensaje</button>
                    </form>
                </div>
            </div>
        </section>
    )
}