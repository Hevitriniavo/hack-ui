import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const PrivateRoute = () => {
  const {value} = useLocalStorage("token");
  const isAuthenticated = !!value;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;