import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { role } = useUser();

  if (!role || !allowedRoles.includes(role)) {
    // User is not logged in or does not have the required role
    // For now, we'll redirect to login. We can add an access denied page later.
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
