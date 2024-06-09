import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    const { currentUser, isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (currentUser && allowedRoles.includes(currentUser.role)) {
        return children;
    } else {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
}

export default ProtectedRoute;