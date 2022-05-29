import logo from '../../assets/logo.png';

export const LoadingPage = () => {
    return (
        <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <div className="w-100 text-center">
                <img src={logo} alt="logo" className="col-xl-1 col-lg-2 col-md-3 col-6" />
            </div>
            <div className="w-100 text-center">
                <div className="spinner-grow spinner-grow-sm text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow spinner-grow-sm text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow spinner-grow-sm text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow spinner-grow-sm text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow spinner-grow-sm text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow spinner-grow-sm text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}
