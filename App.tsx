import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Simulator = lazy(() => import('./pages/Simulator'));
const DesignSimulator = lazy(() => import('./pages/DesignSimulator')); // Ensure this is imported
const Legal = lazy(() => import('./pages/Legal'));
const CGV = lazy(() => import('./pages/CGV'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Contact = lazy(() => import('./pages/Contact'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const DebugFirebase = lazy(() => import('./components/DebugFirebase'));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <div className="relative min-h-screen flex flex-col bg-[#030303]">
            {/* Global Background Elements */}
            <div 
              className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }}
            />
            <div className="fixed top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none z-0 bg-[radial-gradient(circle,rgba(16,185,129,0.15)_0%,rgba(0,0,0,0)_70%)]"></div>
            <div className="fixed bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-900/10 blur-[100px] pointer-events-none z-0"></div>

            <Navigation />
            
            <main className="relative z-10 flex-grow">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  
                  {/* Protected Routes */}
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/admin" element={
                    <ProtectedRoute requireAdmin>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/simulator" element={<Simulator />} />
                  <Route path="/simulator-design" element={<DesignSimulator />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/legal" element={<Legal />} />
                  <Route path="/cgv" element={<CGV />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/debug-firebase" element={<DebugFirebase />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />
          </div>
        </HashRouter>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;
