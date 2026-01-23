import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const SupportDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    baru: 0,
    diproses: 0,
    selesai: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReports();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchReports, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports/cs');
      if (!response.ok) {
        throw new Error('Gagal memuat laporan');
      }
      const data = await response.json();
      // Sort by newest first
      const sortedReports = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReports(sortedReports);

      // Calculate stats
      const stats = data.reduce((acc, report) => {
        acc.total++;
        acc[report.status] = (acc[report.status] || 0) + 1;
        return acc;
      }, { total: 0, baru: 0, diproses: 0, selesai: 0 });

      setStats(stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'baru': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'diproses': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'selesai': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'baru': return 'Baru';
      case 'diproses': return 'Diproses';
      case 'selesai': return 'Selesai';
      default: return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'tinggi': return 'bg-red-100 text-red-800';
      case 'sedang': return 'bg-orange-100 text-orange-800';
      case 'rendah': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryText = (category) => {
    const categories = {
      konten_sensitif: 'Konten Sensitif',
      masalah_akun: 'Masalah Akun',
      bug_sistem: 'Bug Sistem',
      ketidaknyamanan_layanan: 'Ketidaknyamanan Layanan'
    };
    return categories[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mint-50 to-emerald-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-emerald-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Customer Support
            </h1>
            <p className="text-gray-600">
              "Menjadi support berarti hadir dengan empati."
            </p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={() => navigate('/support/user-reports')} variant="secondary">
              Laporan Pengguna
            </Button>
            <Button onClick={() => navigate('/support/profile')} variant="secondary">
              Profil Saya
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Laporan</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.baru}</div>
            <div className="text-sm text-gray-600">Laporan Baru</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.diproses}</div>
            <div className="text-sm text-gray-600">Sedang Diproses</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.selesai}</div>
            <div className="text-sm text-gray-600">Selesai</div>
          </Card>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="p-4 mb-6 bg-red-50 border-red-200">
            <p className="text-red-600">{error}</p>
          </Card>
        )}

        {/* Reports Table */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Laporan Terbaru
            </h2>
            <Button
              size="sm"
              variant="secondary"
              onClick={fetchReports}
              disabled={loading}
            >
              {loading ? 'Memuat...' : 'Refresh'}
            </Button>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600">Belum ada laporan masuk</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Kategori</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Prioritas</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Waktu</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.slice(0, 10).map((report) => (
                    <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">
                        #{report.id.slice(-6)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {getCategoryText(report.category)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {getStatusText(report.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                          {report.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(report.createdAt).toLocaleDateString('id-ID', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          size="sm"
                          onClick={() => navigate(`/support/reports/${report.id}`)}
                        >
                          Tangani
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SupportDashboard;
