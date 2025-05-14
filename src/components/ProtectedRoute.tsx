import  { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';

interface ProtectedRouteProps {
  children: ReactNode;
  employerOnly?: boolean;
}

export default function ProtectedRoute({ children, employerOnly = false }: ProtectedRouteProps) {
  const { isAuthenticated, currentUser, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (employerOnly && currentUser?.userType !== 'employer') {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}
 