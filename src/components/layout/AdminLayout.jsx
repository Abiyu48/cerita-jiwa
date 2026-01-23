import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  FileText,
  User,
  Shield,
  Heart,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [adminName, setAdminName] = useState('Admin User');
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleAdminNameUpdate = (event) => {
      setAdminName(event.detail);
    };

    window.addEventListener('adminNameUpdated', handleAdminNameUpdate);
    return () => window.removeEventListener('adminNameUpdated', handleAdminNameUpdate);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Kelola Pengguna', href: '/admin/users', icon: Users },
    { name: 'Kelola Konten', href: '/admin/content', icon: FileText },
    { name: 'Profil Admin', href: '/admin/profile', icon: User },
  ];

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      {/* Mobile header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-primary-600">Dashboard Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{adminName}</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isCollapsed && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsCollapsed(false)}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
                    <p className="text-xs text-gray-500">Cerita Jiwa</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCollapsed(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-3 py-6 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsCollapsed(false)}
                      className={`flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 space-x-3`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Wellness Reminder */}
              <div className="p-3 border-t border-gray-200">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-200/50 mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-gray-800">Wellness Check</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    Jaga kesehatan mental Anda sebagai admin.
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Wellness Score</span>
                    <span className="font-bold text-purple-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div className="bg-gradient-to-r from-purple-400 to-blue-500 h-1 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex items-center mb-3 space-x-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {adminName}
                    </p>
                    <p className="text-xs text-gray-500">Super Admin</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Keluar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 bg-white shadow-lg transition-all duration-300 ease-in-out hidden lg:flex lg:flex-col ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
                  <p className="text-xs text-gray-500">Cerita Jiwa</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${isCollapsed ? 'mx-auto' : ''}`}
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5 text-gray-500" /> : <ChevronLeft className="w-5 h-5 text-gray-500" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 group ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
                  title={isCollapsed ? item.name : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium text-sm truncate">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Wellness Reminder */}
          <div className="p-3 border-t border-gray-200">
            {!isCollapsed && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-200/50 mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-800">Wellness Check</span>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  Jaga kesehatan mental Anda sebagai admin.
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Wellness Score</span>
                  <span className="font-bold text-purple-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                  <div className="bg-gradient-to-r from-purple-400 to-blue-500 h-1 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            )}
            <div className={`flex items-center mb-3 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center">
                <User className="w-4 h-4 text-emerald-600" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">Super Admin</p>
                </div>
              )}
            </div>
                <button
                  onClick={logout}
                  className={`flex items-center px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full ${isCollapsed ? 'justify-center space-x-0' : 'space-x-2'}`}
                  title={isCollapsed ? 'Keluar' : ''}
                >
                  <LogOut className="w-4 h-4" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">Keluar</span>
                  )}
                </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              {isCollapsed && (
                <button
                  onClick={() => setIsCollapsed(false)}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors lg:block hidden"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
              )}
              <h1 className="text-lg font-semibold text-primary-600">Dashboard Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{adminName}</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
