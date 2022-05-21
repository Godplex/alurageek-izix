import { Navigate, Route, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, user }) => {
    let location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

export default PrivateRoute;