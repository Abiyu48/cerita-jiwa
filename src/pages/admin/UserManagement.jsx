import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Search,
  Filter,
  Eye,
  AlertTriangle,
  Shield,
  UserCheck,
  UserX,
  Clock,
  MessageSquare,
  Flag,
  MoreVertical,
  ChevronDown,
  Heart,
  Activity,
  Lock,
  Unlock,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus
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

const UserManagement = () => {
  const { user, getAllUsers, updateUserStatus, logAdminAction } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load users data on component mount
  useEffect(() => {
    const loadUsers = () => {
      const allUsers = getAllUsers();
      setUsers(allUsers);
    };

    loadUsers();
  }, [getAllUsers]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'restricted': return 'text-orange-600 bg-orange-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-blue-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'journal': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'mood': return <Heart className="w-4 h-4 text-pink-500" />;
      case 'chat': return <MessageSquare className="w-4 h-4 text-purple-500" />;
      case 'report': return <Flag className="w-4 h-4 text-red-500" />;
      case 'restriction': return <Lock className="w-4 h-4 text-orange-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'education': return <Activity className="w-4 h-4 text-green-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || user.riskLevel === riskFilter;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const handleUserAction = (userId, action) => {
    // In a real app, this would make API calls
    console.log(`Performing ${action} on user ${userId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Kelola Pengguna</h1>
              <p className="text-gray-600 mt-1">Pantau dan jaga keamanan pengguna platform kesehatan mental</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Pengguna</p>
                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Filters */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari pengguna..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Semua Status</option>
                  <option value="active">Aktif</option>
                  <option value="restricted">Dibatasi</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Semua Risiko</option>
                  <option value="low">Risiko Rendah</option>
                  <option value="medium">Risiko Sedang</option>
                  <option value="high">Risiko Tinggi</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </Card>

        {/* Users Table */}
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Pengguna</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Risiko</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Aktivitas</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Terakhir Aktif</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-gray-800">{user.username}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-400">Bergabung {user.joinDate}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? 'Aktif' :
                         user.status === 'restricted' ? 'Dibatasi' : 'Tidak Aktif'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(user.riskLevel)}`}>
                          {user.riskLevel === 'low' ? 'Rendah' :
                           user.riskLevel === 'medium' ? 'Sedang' : 'Tinggi'}
                        </span>
                        {getTrendIcon(user.moodTrend)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-600">
                        <p>{user.totalJournals} jurnal</p>
                        <p>{user.totalReports} laporan</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-600">{user.lastActive}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          <Eye className="w-3 h-3 inline mr-1" />
                          Lihat
                        </button>
                        <div className="relative">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* User Detail Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Detail Pengguna</h2>
                    <p className="text-gray-600">{selectedUser.username}</p>
                  </div>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <UserX className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* User Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Informasi Dasar</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Username:</span>
                        <span className="font-medium">{selectedUser.username}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedUser.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bergabung:</span>
                        <span className="font-medium">{selectedUser.joinDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)}`}>
                          {selectedUser.status === 'active' ? 'Aktif' :
                           selectedUser.status === 'restricted' ? 'Dibatasi' : 'Tidak Aktif'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Statistik Aktivitas</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Jurnal:</span>
                        <span className="font-medium">{selectedUser.totalJournals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Laporan:</span>
                        <span className="font-medium">{selectedUser.totalReports}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tren Emosi:</span>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(selectedUser.moodTrend)}
                          <span className="font-medium capitalize">{selectedUser.moodTrend}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Level Risiko:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(selectedUser.riskLevel)}`}>
                          {selectedUser.riskLevel === 'low' ? 'Rendah' :
                           selectedUser.riskLevel === 'medium' ? 'Sedang' : 'Tinggi'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
                  <div className="space-y-3">
                    {selectedUser.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{activity.content}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin Actions */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Aksi Admin</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => handleUserAction(selectedUser.id, 'warning')}
                      className="px-4 py-3 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-colors"
                    >
                      <AlertTriangle className="w-4 h-4 inline mr-2" />
                      Beri Peringatan Empatik
                    </button>
                    <button
                      onClick={() => handleUserAction(selectedUser.id, 'restrict')}
                      className="px-4 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
                    >
                      <Lock className="w-4 h-4 inline mr-2" />
                      Batasi Sementara
                    </button>
                    <button
                      onClick={() => handleUserAction(selectedUser.id, 'reset')}
                      className="px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                    >
                      <Unlock className="w-4 h-4 inline mr-2" />
                      Reset Akses
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    <Shield className="w-3 h-3 inline mr-1" />
                    Semua aksi dilakukan dengan pendekatan humanis dan menjaga privasi pengguna
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Wellness Reminder */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">Admin Wellness Reminder</h3>
              <p className="text-sm text-gray-600 mt-1">
                Anda telah meninjau 12 profil pengguna hari ini. Ingat untuk mengambil jeda 10 menit setiap 3 jam untuk menjaga kesehatan mental Anda sendiri.
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

export default UserManagement;
