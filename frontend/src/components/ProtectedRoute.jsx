import { Navigate, Outlet } from 'react-router-dom';
import api from '../api';
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    api.get('/auth/check-auth') // Backend route to verify authentication
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
