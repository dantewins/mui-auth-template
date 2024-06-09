import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const MinimalLayout = () => {
  const { currentUser, isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={`/${currentUser.role === 'user' ? '' : currentUser.role}`} replace />;
  }

  return <Outlet />;
};

export default MinimalLayout;