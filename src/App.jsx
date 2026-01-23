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

// Admin
import { AdminDashboard, UserManagement, ContentManagement, AdminProfile } from './pages/admin';

// Report & Support
import CreateReport from './pages/reports/CreateReport';
import ReportHistory from './pages/reports/ReportHistory';
import SupportDashboard from './pages/support/SupportDashboard';
import HandleReport from './pages/support/HandleReport';
import SupportProfile from './pages/support/SupportProfile';
import UserReports from './pages/support/UserReports';
import AdminReportDashboard from './pages/admin/AdminReportDashboard';
import AdminReportDecision from './pages/admin/AdminReportDecision';

// ===============================
// 🔥 DEMO MODE (UBAH KE false JIKA SUDAH PRODUKSI)
// ===============================
const DEMO_MODE = true;

// ===============================
// Protected Route (AUTO LEWAT LOGIN)
// ===============================
const ProtectedRoute = ({ children }) => {
  if (DEMO_MODE) {
    return <Layout>{children}</Layout>;
  }

  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

// ===============================
function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>

            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/guest" element={<GuestMode />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User */}
            <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
            <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
            <Route path="/mood-tracker" element={<ProtectedRoute><MoodTracker /></ProtectedRoute>} />
            <Route path="/relaxation" element={<ProtectedRoute><Insight /></ProtectedRoute>} />
            <Route path="/ai-chat" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />
            <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Reports */}
            <Route path="/reports/create" element={<ProtectedRoute><CreateReport /></ProtectedRoute>} />
            <Route path="/reports/history" element={<ProtectedRoute><ReportHistory /></ProtectedRoute>} />

            {/* Support */}
            <Route path="/support/dashboard" element={<ProtectedRoute><SupportDashboard /></ProtectedRoute>} />
            <Route path="/support/reports/:id" element={<ProtectedRoute><HandleReport /></ProtectedRoute>} />
            <Route path="/support/profile" element={<ProtectedRoute><SupportProfile /></ProtectedRoute>} />
            <Route path="/support/user-reports" element={<ProtectedRoute><UserReports /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><AdminLayout><UserManagement /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/content" element={<ProtectedRoute><AdminLayout><ContentManagement /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/profile" element={<ProtectedRoute><AdminLayout><AdminProfile /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute><AdminReportDashboard /></ProtectedRoute>} />
            <Route path="/admin/reports/:id" element={<ProtectedRoute><AdminReportDecision /></ProtectedRoute>} />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
