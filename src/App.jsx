import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import LandingPage from './pages/LandingPage';
import GuestMode from './pages/GuestMode';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserDashboard from './pages/dashboard/UserDashboard';
import Journal from './pages/journal/Journal';
import MoodTracker from './pages/dashboard/MoodTracker';
import Insight from './pages/relaxation/Insight';
import AIChat from './pages/ai-chat/index';
import Education from './pages/education/index';
import Profile from './pages/profile/index';

// Admin Pages
import { AdminDashboard, UserManagement, ContentManagement, AdminProfile } from './pages/admin';

// Report Pages (No Sidebar)
import CreateReport from './pages/reports/CreateReport';
import ReportHistory from './pages/reports/ReportHistory';
import SupportDashboard from './pages/support/SupportDashboard';
import HandleReport from './pages/support/HandleReport';
import SupportProfile from './pages/support/SupportProfile';
import AdminReportDashboard from './pages/admin/AdminReportDashboard';
import AdminReportDecision from './pages/admin/AdminReportDecision';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Layout>{children}</Layout>;
};

// Guest Route Component (only for non-authenticated users)
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-500"></div>
      </div>
    );
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <GuestRoute>
                <LandingPage />
              </GuestRoute>
            } />

            {/* Guest Mode Route */}
            <Route path="/guest" element={
              <GuestRoute>
                <GuestMode />
              </GuestRoute>
            } />

            {/* Auth Routes */}
            <Route path="/login" element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            } />
            <Route path="/register" element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            } />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserDashboard />
              </ProtectedRoute>
            } />

            {/* Journal Route */}
            <Route path="/journal" element={
              <ProtectedRoute allowedRoles={['user']}>
                <Journal />
              </ProtectedRoute>
            } />

            {/* Mood Tracker Route */}
            <Route path="/mood-tracker" element={
              <ProtectedRoute allowedRoles={['user']}>
                <MoodTracker />
              </ProtectedRoute>
            } />

            <Route path="/relaxation" element={
              <ProtectedRoute allowedRoles={['user']}>
                <Insight />
              </ProtectedRoute>
            } />

            <Route path="/ai-chat" element={
              <ProtectedRoute allowedRoles={['user']}>
                <AIChat />
              </ProtectedRoute>
            } />

            <Route path="/education" element={
              <ProtectedRoute allowedRoles={['user']}>
                <Education />
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout>
                  <UserManagement />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/content" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout>
                  <ContentManagement />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/profile" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout>
                  <AdminProfile />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

            {/* Support Routes (No Sidebar) */}
            <Route path="/support/dashboard" element={
              <ProtectedRoute allowedRoles={['support']}>
                <SupportDashboard />
              </ProtectedRoute>
            } />
            <Route path="/support/reports/:id" element={
              <ProtectedRoute allowedRoles={['support']}>
                <HandleReport />
              </ProtectedRoute>
            } />
            <Route path="/support/profile" element={
              <ProtectedRoute allowedRoles={['support']}>
                <SupportProfile />
              </ProtectedRoute>
            } />
            <Route path="/support" element={<Navigate to="/support/dashboard" replace />} />

            {/* User Report Routes (No Sidebar) */}
            <Route path="/reports/create" element={
              <ProtectedRoute allowedRoles={['user']}>
                <CreateReport />
              </ProtectedRoute>
            } />
            <Route path="/reports/history" element={
              <ProtectedRoute allowedRoles={['user']}>
                <ReportHistory />
              </ProtectedRoute>
            } />

            {/* Admin Report Routes (No Sidebar) */}
            <Route path="/admin/reports" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminReportDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/reports/:id" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminReportDecision />
              </ProtectedRoute>
            } />

            {/* 404 */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-4">Halaman tidak ditemukan</p>
                  <a href="/" className="text-mint-600 hover:text-mint-500">
                    Kembali ke Beranda
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
