import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { FileText, MessageCircle, User, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const UserReports = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports/cs');
      if (!response.ok) {
        throw new Error('Gagal memuat laporan pengguna');
      }
      const data = await response.json();
      // Sort by newest first
      const sortedReports = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReports(sortedReports);
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

  const getCategoryText = (category) => {
    const categories = {
      konten_sensitif: 'Konten Sensitif',
      masalah_akun: 'Masalah Akun',
      bug_sistem: 'Bug Sistem',
      ketidaknyamanan_layanan: 'Ketidaknyamanan Layanan'
    };
    return categories[category] || category;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'tinggi': return 'bg-red-100 text-red-800';
      case 'sedang': return 'bg-orange-100 text-orange-800';
      case 'rendah': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Laporan Pengguna
            </h1>
            <p className="text-gray-600">
              Kelola dan tanggapi laporan yang dikirimkan oleh pengguna
            </p>
          </div>
          <Button onClick={() => navigate('/support/dashboard')} variant="secondary">
            Kembali ke Dashboard
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="p-4 mb-6 bg-red-50 border-red-200">
            <p className="text-red-600">{error}</p>
          </Card>
        )}

        {/* Reports List */}
        {reports.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Belum ada laporan pengguna
            </h3>
            <p className="text-gray-600">
              Saat ini belum ada laporan yang dikirimkan oleh pengguna
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-sky-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {getCategoryText(report.category)}
                      </h3>
                      <p className="text-sm text-gray-500">Laporan #{report.id.slice(-6)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {getStatusText(report.status)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{report.description}</p>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>
                    {new Date(report.createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {report.replies?.length || 0} balasan
                  </span>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={() => navigate(`/support/reports/${report.id}`)}
                    className="flex-1"
                  >
                    Tangani Laporan
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setSelectedReport(selectedReport?.id === report.id ? null : report)}
                  >
                    {selectedReport?.id === report.id ? 'Tutup' : 'Lihat Detail'}
                  </Button>
                </div>

                {/* Expanded Details */}
                {selectedReport?.id === report.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Riwayat Percakapan</h4>
                    {report.replies && report.replies.length > 0 ? (
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {report.replies.map((reply) => (
                          <div key={reply.id} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-blue-900">{reply.authorName}</span>
                              <span className="text-xs text-blue-600">
                                {new Date(reply.timestamp).toLocaleDateString('id-ID', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <p className="text-blue-800 text-sm whitespace-pre-wrap">{reply.message}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">Belum ada balasan dari Customer Support</p>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReports;
