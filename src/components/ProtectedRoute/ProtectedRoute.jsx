import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '@/context/AuthProvider';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    // If there is no authenticated user, redirect to the login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, render the children routes
    return children;
};

export default ProtectedRoute;
