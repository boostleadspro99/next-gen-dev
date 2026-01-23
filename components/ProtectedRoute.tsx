import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { currentUser, userProfile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  // 1. Check if user is logged in
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Check if email is verified (skip for admin if needed, or enforce for all)
  if (!currentUser.emailVerified) {
     // Allow access to the verification page, block everything else
     if (location.pathname !== '/verify-email') {
         return <Navigate to="/verify-email" replace />;
     }
  }

  // 3. Check for Admin role if required
  if (requireAdmin && userProfile?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is on verify-email but IS verified, send them to dashboard
  if (currentUser.emailVerified && location.pathname === '/verify-email') {
      return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
