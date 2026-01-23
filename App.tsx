import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Simulator from './pages/Simulator';
import Legal from './pages/Legal';
import CGV from './pages/CGV';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import VerifyEmail from './pages/VerifyEmail';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <HashRouter>
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
                <Route path="/contact" element={<Contact />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/cgv" element={<CGV />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </HashRouter>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;
