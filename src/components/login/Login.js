import React from 'react'

export const Login = () => {
    return (
        <section className="py-5 bg-secondary">
            <div className="container py-2">
                <div className="d-md-flex justify-content-center">
                    <div className="col-md-6 col-lg-5 text-center">
                        <h5 className="fw-bolder">Iniciar Sesión</h5>
                        <div className="form-row">
                            <input type="email" required className="form-control form-control-lg py-3 mt-3" />
                            <label alt="Label" data-placeholder="Escriba su correo electronico"></label>
                        </div>
                        <div className="form-row">
                            <input type="password" required className="form-control form-control-lg py-3" />
                            <label alt="Label" data-placeholder="Escriba su contraseña"></label>
                        </div>
                        <button className="btn btn-primary py-3 col-5 col-lg-12" type="button">Entrar</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
