import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const SupportProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock stats - in real app, this would come from API
  const stats = {
    totalReports: 45,
    resolvedReports: 42,
    escalatedReports: 3,
    avgResponseTime: '2.5 jam'
  };

  const handleUpdateProfile = async () => {
    if (!formData.name.trim()) {
      setError('Nama tidak boleh kosong');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // In a real app, this would call an API
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccess('Profil berhasil diperbarui');
      setIsEditing(false);
    } catch (err) {
      setError('Gagal memperbarui profil');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('Semua field password harus diisi');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Password baru dan konfirmasi tidak cocok');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password baru minimal 6 karakter');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // In a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccess('Password berhasil diubah');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      setError('Gagal mengubah password');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-emerald-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Profil Customer Support
            </h1>
            <p className="text-gray-600">
              "Menjadi support berarti hadir dengan empati."
            </p>
          </div>
          <Button onClick={() => navigate('/support/dashboard')} variant="secondary">
            Kembali ke Dashboard
          </Button>
        </div>

        {/* Success/Error Messages */}
        {error && (
          <Card className="p-4 mb-6 bg-red-50 border-red-200">
            <p className="text-red-600">{error}</p>
          </Card>
        )}
        {success && (
          <Card className="p-4 mb-6 bg-green-50 border-green-200">
            <p className="text-green-600">{success}</p>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Informasi Profil</h2>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="secondary"
                  size="sm"
                >
                  {isEditing ? 'Batal' : 'Edit Profil'}
                </Button>
              </div>

              <div className="space-y-4">
                <Input
                  label="Nama Lengkap"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!isEditing}
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="bg-gray-50"
                />
                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <strong>Role:</strong> Customer Support
                </div>

                {isEditing && (
                  <Button
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </Button>
                )}
              </div>
            </Card>

            {/* Change Password */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Ubah Password</h2>
              <div className="space-y-4">
                <Input
                  label="Password Saat Ini"
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                />
                <Input
                  label="Password Baru"
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                />
                <Input
                  label="Konfirmasi Password Baru"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
                <Button
                  onClick={handleChangePassword}
                  disabled={loading}
                  variant="secondary"
                  className="w-full"
                >
                  {loading ? 'Mengubah...' : 'Ubah Password'}
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Statistik Kerja</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Laporan Ditangani</span>
                  <span className="font-semibold text-gray-900">{stats.totalReports}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Laporan Diselesaikan</span>
                  <span className="font-semibold text-green-600">{stats.resolvedReports}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Laporan Dieskalasi</span>
                  <span className="font-semibold text-orange-600">{stats.escalatedReports}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rata-rata Response Time</span>
                  <span className="font-semibold text-blue-600">{stats.avgResponseTime}</span>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Aktivitas Terbaru</h2>
              <div className="space-y-3">
                <div className="text-sm border-l-2 border-blue-200 pl-3">
                  <p className="font-medium text-gray-900">Balas laporan #1234</p>
                  <p className="text-gray-600">2 jam yang lalu</p>
                </div>
                <div className="text-sm border-l-2 border-green-200 pl-3">
                  <p className="font-medium text-gray-900">Selesaikan laporan #1233</p>
                  <p className="text-gray-600">5 jam yang lalu</p>
                </div>
                <div className="text-sm border-l-2 border-orange-200 pl-3">
                  <p className="font-medium text-gray-900">Eskalasi laporan #1232</p>
                  <p className="text-gray-600">1 hari yang lalu</p>
                </div>
              </div>
            </Card>

            {/* Logout */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Keluar</h2>
              <p className="text-gray-600 text-sm mb-4">
                Pastikan semua pekerjaan sudah disimpan sebelum keluar.
              </p>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-red-300 text-red-700 hover:bg-red-50"
              >
                Logout
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportProfile;
