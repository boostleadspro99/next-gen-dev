import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { currentUser, isSuperAdmin, loading } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-neutral-400 animate-pulse">Chargement des permissions...</p>
        </div>
      </div>
    );
  }

  // 1. Check if user is logged in
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Check for Admin role if required
  if (requireAdmin && !isSuperAdmin) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-surface border border-red-900/20 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Accès non autorisé</h2>
          <p className="text-neutral-400 mb-8">
            Désolé, vous n'avez pas les permissions nécessaires pour accéder à cette section.
          </p>
          <button 
            onClick={() => window.location.href = '#/dashboard'}
            className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl transition-colors font-medium"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  // 3. Check if email is verified (Enforced for all, including admin for maximum security)
  if (!currentUser.emailVerified && location.pathname !== '/verify-email') {
    return <Navigate to="/verify-email" replace />;
  }

  // If user is on verify-email but IS verified, send them to dashboard
  if (currentUser.emailVerified && location.pathname === '/verify-email') {
      return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
