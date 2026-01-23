import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Footer from './Footer';
import {
  Home,
  Heart,
  BookOpen,
  Music,
  MessageCircle,
  GraduationCap,
  User,
  Menu,
  X,
  LogOut,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profile, setProfile] = useState({ name: '', avatar: '' });

  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      } else {
        setProfile({ name: user.name, avatar: '' });
      }
    }
  }, [user]);

  useEffect(() => {
    const handleProfileUpdate = (event) => {
      setProfile(event.detail);
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('profileUpdated', handleProfileUpdate);
  }, []);

  const getUserNavigation = () => {
    // Admin users should use AdminLayout, not regular Layout
    if (user?.role === 'admin') {
      return [];
    }

    const baseNav = [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
      { name: 'Mood Tracker', href: '/mood-tracker', icon: Heart },
      { name: 'Jurnal', href: '/journal', icon: BookOpen },
      { name: 'Relaksasi', href: '/relaxation', icon: Music },
      { name: 'AI Chat', href: '/ai-chat', icon: MessageCircle },
      { name: 'Edukasi', href: '/education', icon: GraduationCap },
      { name: 'Profil', href: '/profile', icon: User },
    ];

    if (user?.role === 'support') {
      return [
        { name: 'Dashboard Support', href: '/support', icon: MessageCircle },
        { name: 'Laporan Pengguna', href: '/support/reports', icon: Users },
        { name: 'Profil', href: '/profile', icon: User },
      ];
    }

    return baseNav;
  };

  const navigation = getUserNavigation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-lavender-50">
      {/* Mobile sidebar - Only for non-admin users */}
      {user?.role !== 'admin' && (
        <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`fixed inset-0 bg-black/20 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSidebarOpen(false)} />
          <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold text-primary-600">Cerita Jiwa</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
              ))}
              <button
                onClick={logout}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
              >
                <LogOut className="w-5 h-5" />
                <span>Keluar</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar - Only for non-admin users */}
      {user?.role !== 'admin' && (
        <div className={`fixed inset-y-0 left-0 z-40 bg-white shadow-lg transition-all duration-300 ease-in-out hidden lg:flex lg:flex-col ${isCollapsed ? 'w-16' : 'w-64'}`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              {!isCollapsed && (
                <h1 className="text-xl font-bold text-primary-600 transition-opacity duration-300">Cerita Jiwa</h1>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${isCollapsed ? 'mx-auto' : ''}`}
              >
                {isCollapsed ? <ChevronRight className="w-5 h-5 text-gray-500" /> : <ChevronLeft className="w-5 h-5 text-gray-500" />}
              </button>
            </div>
            <nav className="flex-1 px-3 py-6 space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 group ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
                  title={isCollapsed ? item.name : ''}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium text-sm truncate">{item.name}</span>
                  )}
                </a>
              ))}
            </nav>
            <div className="p-3 border-t border-gray-200">
              <div className={`flex items-center mb-3 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Hai, {profile.name || user?.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
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
      )}

      {/* Main content */}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${user?.role === 'admin' ? '' : (isCollapsed ? 'lg:ml-16' : 'lg:ml-64')}`}>
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
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-600 hover:text-gray-900 lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
            <h1 className="text-lg font-semibold text-primary-600">Cerita Jiwa</h1>
            <div className="w-6" />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;