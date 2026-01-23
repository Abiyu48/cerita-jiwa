import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  Users,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  Flag,
  Eye,
  Clock,
  Heart,
  Shield,
  BarChart3,
  PieChart,
  Activity,
  MessageSquare,
  UserCheck,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  Target,
  Zap
} from 'lucide-react';

// Card Component (inline)
const Card = ({
  children,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={`bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const { moodHistory, journalEntries, getSystemStats } = useApp();

  // Admin-specific state for aggregate data
  const [allMoodHistory, setAllMoodHistory] = useState([]);
  const [allJournalEntries, setAllJournalEntries] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const [stats, setStats] = useState({
    dailyActiveUsers: 0,
    weeklyActiveUsers: 0,
    totalJournals: 0,
    pendingReviews: 0,
    positiveMood: 0,
    neutralMood: 0,
    negativeMood: 0,
    totalReports: 0
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'journal',
      user: 'User_****123',
      action: 'posted new journal',
      time: '2 minutes ago',
      status: 'pending',
      mood: 'negative'
    },
    {
      id: 2,
      type: 'report',
      user: 'User_****456',
      action: 'reported content',
      time: '15 minutes ago',
      status: 'reviewed',
      mood: 'neutral'
    },
    {
      id: 3,
      type: 'user',
      user: 'User_****789',
      action: 'account flagged',
      time: '1 hour ago',
      status: 'warning',
      mood: 'high_risk'
    },
    {
      id: 4,
      type: 'content',
      user: 'System',
      action: 'article published',
      time: '2 hours ago',
      status: 'approved',
      mood: 'positive'
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'Konten Sensitif Perlu Ditinjau',
      message: 'Jurnal anonim mengandung kata-kata risiko tinggi',
      time: '5 minutes ago',
      priority: 'high',
      actionTaken: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Pengguna Berisiko Tinggi',
      message: 'User_****789 menunjukkan pola emosi yang memprihatinkan',
      time: '1 hour ago',
      priority: 'medium',
      actionTaken: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Laporan Baru Masuk',
      message: '3 laporan konten baru perlu peninjauan',
      time: '2 hours ago',
      priority: 'low',
      actionTaken: false
    }
  ]);

  useEffect(() => {
    // Get real system statistics
    const stats = getSystemStats();

    setStats({
      dailyActiveUsers: stats.activeUsersToday,
      weeklyActiveUsers: stats.activeUsersWeek,
      totalJournals: stats.totalJournals,
      pendingReviews: stats.pendingReviews,
      positiveMood: stats.moodDistribution.positive > 0 ?
        Math.round((stats.moodDistribution.positive / stats.totalMoods) * 100) : 0,
      neutralMood: stats.moodDistribution.neutral > 0 ?
        Math.round((stats.moodDistribution.neutral / stats.totalMoods) * 100) : 0,
      negativeMood: stats.moodDistribution.negative > 0 ?
        Math.round((stats.moodDistribution.negative / stats.totalMoods) * 100) : 0,
      totalReports: stats.reportedContent
    });

    setTotalUsers(stats.totalUsers);
  }, []);

  const moodData = [
    { label: 'Positif', value: stats.positiveMood, color: 'bg-green-400' },
    { label: 'Netral', value: stats.neutralMood, color: 'bg-yellow-400' },
    { label: 'Negatif', value: stats.negativeMood, color: 'bg-red-400' }
  ];

  const weeklyData = [
    { day: 'Sen', users: 1200, journals: 245 },
    { day: 'Sel', users: 1350, journals: 289 },
    { day: 'Rab', users: 1180, journals: 234 },
    { day: 'Kam', users: 1420, journals: 312 },
    { day: 'Jum', users: 1380, journals: 298 },
    { day: 'Sab', users: 1250, journals: 267 },
    { day: 'Min', users: 1247, journals: 256 }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'journal': return <BookOpen className="w-4 h-4" />;
      case 'report': return <Flag className="w-4 h-4" />;
      case 'user': return <Users className="w-4 h-4" />;
      case 'content': return <MessageSquare className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'reviewed': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'approved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-orange-500 bg-orange-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
              <p className="text-gray-600 mt-1">Pantau kondisi platform kesehatan mental secara real-time</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Terakhir diperbarui</p>
                <p className="text-sm font-medium text-gray-700">{new Date().toLocaleTimeString('id-ID')}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pengguna Aktif Hari Ini</p>
                <p className="text-3xl font-bold text-gray-800">{stats.dailyActiveUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">+12% dari kemarin</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pengguna Aktif Minggu Ini</p>
                <p className="text-3xl font-bold text-gray-800">{stats.weeklyActiveUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">+8% dari minggu lalu</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jurnal Masuk</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalJournals.toLocaleString()}</p>
                <p className="text-sm text-blue-600 mt-1">+156 hari ini</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Konten Perlu Ditinjau</p>
                <p className="text-3xl font-bold text-gray-800">{stats.pendingReviews}</p>
                <p className="text-sm text-orange-600 mt-1">Perlu perhatian segera</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mood Distribution */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Distribusi Suasana Emosi</h3>
              <PieChart className="w-6 h-6 text-gray-400" />
            </div>
            <div className="space-y-4">
              {moodData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 w-8">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800">
                <Heart className="w-4 h-4 inline mr-1" />
                Mayoritas pengguna menunjukkan suasana positif hari ini
              </p>
            </div>
          </Card>

          {/* Weekly Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Aktivitas Mingguan</h3>
              <BarChart3 className="w-6 h-6 text-gray-400" />
            </div>
            <div className="space-y-3">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 w-8">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="flex space-x-1">
                      <div className="flex-1 bg-blue-200 rounded h-6 relative">
                        <div
                          className="bg-blue-500 rounded h-6"
                          style={{ width: `${(day.users / 1500) * 100}%` }}
                        ></div>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                          {day.users}
                        </span>
                      </div>
                      <div className="flex-1 bg-emerald-200 rounded h-6 relative">
                        <div
                          className="bg-emerald-500 rounded h-6"
                          style={{ width: `${(day.journals / 350) * 100}%` }}
                        ></div>
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                          {day.journals}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-4 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Pengguna</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                <span>Jurnal</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Notifications & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Urgent Notifications */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Notifikasi Penting</h3>
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-4 rounded-xl border-l-4 ${getPriorityColor(notification.priority)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                    <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600 transition-colors">
                      Tinjau
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all">
                <Eye className="w-4 h-4 inline mr-2" />
                Tinjau Semua Konten Sensitif
              </button>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Aktivitas Terbaru</h3>
              <Activity className="w-6 h-6 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Lihat Semua Aktivitas →
              </button>
            </div>
          </Card>
        </div>

        {/* Reports Summary */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Ringkasan Laporan</h3>
            <Flag className="w-6 h-6 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">12</p>
              <p className="text-sm text-gray-600">Laporan Ditolak</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">23</p>
              <p className="text-sm text-gray-600">Dalam Proses</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">156</p>
              <p className="text-sm text-gray-600">Laporan Selesai</p>
            </div>
          </div>
        </Card>

        {/* Wellness Reminder */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">Admin Wellness Reminder</h3>
              <p className="text-sm text-gray-600 mt-1">
                Anda telah meninjau 8 konten sensitif hari ini. Ingat untuk mengambil jeda 5 menit setiap 2 jam untuk menjaga kesehatan mental Anda sendiri.
              </p>
            </div>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-colors">
              Ambil Jeda
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
