import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Shield,
  Settings,
  Heart,
  Activity,
  Clock,
  Mail,
  Phone,
  Edit,
  Save,
  X,
  Eye,
  EyeOff,
  Key,
  Calendar,
  TrendingUp,
  Lock,
  Unlock,
  CheckCircle,
  AlertTriangle,
  Camera,
  Upload,
  Loader
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

const AdminProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [adminData, setAdminData] = useState({
    name: 'Dr. Sari Mental Health',
    email: 'admin@ceritajiwa.com',
    phone: '+62 812-3456-7890',
    role: 'Super Admin',
    joinDate: 'June 2023',
    department: 'Mental Health Administration'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [wellnessSettings, setWellnessSettings] = useState({
    maxContentPerSession: 15,
    breakReminderInterval: 2, // hours
    wellnessScore: 85
  });

  const [activityStats, setActivityStats] = useState({
    totalReviews: 1247,
    totalActions: 3421,
    avgResponseTime: '2.3 hours',
    wellnessScore: 85
  });

  const [auditLog, setAuditLog] = useState([]);

  // Sample recent activities data
  const [recentActivities] = useState([
    {
      id: 1,
      type: 'approval',
      action: 'Menyetujui konten',
      target: 'Story #1234',
      time: '5 menit lalu'
    },
    {
      id: 2,
      type: 'flag',
      action: 'Menandai konten sensitif',
      target: 'Story #1235',
      time: '15 menit lalu'
    },
    {
      id: 3,
      type: 'resolution',
      action: 'Menyelesaikan laporan',
      target: 'Report #456',
      time: '1 jam lalu'
    },
    {
      id: 4,
      type: 'system',
      action: 'Memperbarui pengaturan',
      target: 'System Settings',
      time: '2 jam lalu'
    },
    {
      id: 5,
      type: 'approval',
      action: 'Menyetujui komentar',
      target: 'Comment #789',
      time: '3 jam lalu'
    }
  ]);

  // Load profile data on component mount
  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/admin/profile/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to load profile');
        }
        const profileData = await response.json();

        setAdminData({
          name: profileData.name || 'Dr. Sari Mental Health',
          email: profileData.email || 'admin@ceritajiwa.com',
          phone: profileData.phone || '+62 812-3456-7890',
          role: profileData.role || 'Super Admin',
          joinDate: profileData.joinDate || 'June 2023',
          department: profileData.department || 'Mental Health Administration'
        });

        setProfileImage(profileData.profileImage || null);

        if (profileData.wellnessSettings) {
          setWellnessSettings(profileData.wellnessSettings);
        }

      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Gagal memuat profil');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user?.id]);

  const handleSave = async () => {
    if (!user?.id) return;

    setSaving(true);
    setError('');

    try {
      const updateData = {
        ...adminData,
        profileImage,
        wellnessSettings
      };

      const response = await fetch(`/api/admin/profile/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      // Update the greeting in AdminLayout
      const greetingEvent = new CustomEvent('adminNameUpdated', { detail: adminData.name });
      window.dispatchEvent(greetingEvent);

      setIsEditing(false);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Gagal menyimpan profil');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset any changes if needed
  };

  const handlePasswordChange = () => {
    // In a real app, this would validate and update password
    alert('Password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'approval': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'flag': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'resolution': return <Shield className="w-4 h-4 text-blue-500" />;
      case 'system': return <Settings className="w-4 h-4 text-purple-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Profil Admin</h1>
              <p className="text-gray-600 mt-1">Kelola informasi dan pengaturan akun admin</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Wellness Score</p>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-lg font-bold text-gray-800">{wellnessSettings.wellnessScore}%</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Profile Picture Upload */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Foto Profil</h2>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 mb-2">Unggah Foto Profil Baru</h3>
              <p className="text-sm text-gray-600 mb-4">
                Pilih gambar dengan format JPG, PNG, atau GIF. Ukuran maksimal 5MB.
              </p>
              <button className="px-4 py-2 bg-gray-500 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors">
                <Upload className="w-4 h-4 inline mr-2" />
                Pilih File
              </button>
            </div>
          </div>
        </Card>

        {/* Profile Information */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Informasi Pribadi</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
              >
                <Edit className="w-4 h-4 inline mr-2" />
                Edit
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4 inline mr-2" />
                  Batal
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              {isEditing ? (
                <input
                  type="text"
                  value={adminData.name}
                  onChange={(e) => setAdminData({...adminData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800 font-medium">{adminData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={adminData.email}
                  onChange={(e) => setAdminData({...adminData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800 font-medium">{adminData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={adminData.phone}
                  onChange={(e) => setAdminData({...adminData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800 font-medium">{adminData.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <p className="text-gray-800 font-medium">{adminData.role}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bergabung Sejak</label>
              <p className="text-gray-800 font-medium">{adminData.joinDate}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Departemen</label>
              <p className="text-gray-800 font-medium">{adminData.department}</p>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Pengaturan Keamanan</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-4">Ubah Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password Lama</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={handlePasswordChange}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
              >
                <Key className="w-4 h-4 inline mr-2" />
                Ubah Password
              </button>
            </div>
          </div>
        </Card>

        {/* Activity Stats & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Statistics */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Statistik Aktivitas</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-800">{activityStats.totalReviews}</p>
                <p className="text-sm text-gray-600">Konten Ditinjau</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-800">{activityStats.totalActions}</p>
                <p className="text-sm text-gray-600">Total Aksi</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-800">{activityStats.avgResponseTime}</p>
                <p className="text-sm text-gray-600">Rata-rata Response</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-gray-800">{activityStats.wellnessScore}%</p>
                <p className="text-sm text-gray-600">Wellness Score</p>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Aktivitas Terbaru</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.target} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Wellness Settings */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Pengaturan Wellness</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maksimal Konten Per Sesi
              </label>
              <input
                type="range"
                min="5"
                max="50"
                value={wellnessSettings.maxContentPerSession}
                onChange={(e) => setWellnessSettings({...wellnessSettings, maxContentPerSession: e.target.value})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>5</span>
                <span className="font-medium">{wellnessSettings.maxContentPerSession} konten</span>
                <span>50</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interval Pengingat Jeda (jam)
              </label>
              <select
                value={wellnessSettings.breakReminderInterval}
                onChange={(e) => setWellnessSettings({...wellnessSettings, breakReminderInterval: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1">Setiap 1 jam</option>
                <option value="2">Setiap 2 jam</option>
                <option value="3">Setiap 3 jam</option>
                <option value="4">Setiap 4 jam</option>
              </select>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-800">
              <Shield className="w-4 h-4 inline mr-1" />
              Pengaturan ini membantu menjaga kesehatan mental Anda sebagai admin. Sistem akan memberikan pengingat jeda secara otomatis.
            </p>
          </div>
        </Card>

        {/* Wellness Reminder */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">Wellness Reminder</h3>
              <p className="text-sm text-gray-600 mt-1">
                "Menjaga kesehatan mental pengguna juga berarti menjaga kesehatan mental admin."
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Anda telah meninjau {activityStats.totalReviews} konten hari ini. Jaga keseimbangan Anda! 💙
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

export default AdminProfile;