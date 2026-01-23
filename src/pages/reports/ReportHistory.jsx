import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ReportHistory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch(`/api/reports/user/${user.id}`);
      if (!response.ok) {
        throw new Error('Gagal memuat riwayat laporan');
      }
      const data = await response.json();
      // Sort by newest first
      setReports(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
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
              Riwayat Laporan
            </h1>
            <p className="text-gray-600">
              Lihat status dan balasan dari laporan yang telah Anda kirimkan.
            </p>
          </div>
          <Button onClick={() => navigate('/reports/create')}>
            Buat Laporan Baru
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
          <Card className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada laporan
            </h3>
            <p className="text-gray-600 mb-6">
              Anda belum mengirimkan laporan apapun. Jika ada masalah, jangan ragu untuk melaporkannya.
            </p>
            <Button onClick={() => navigate('/reports/create')}>
              Buat Laporan Pertama
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {reports.map((report) => (
              <Card key={report.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-gray-500">#{report.id.slice(-6)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {getStatusText(report.status)}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {getCategoryText(report.category)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(report.createdAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{report.description}</p>
                </div>

                {/* Replies */}
                {report.replies && report.replies.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Balasan Customer Support:</h4>
                    {report.replies.map((reply) => (
                      <div key={reply.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-blue-900">{reply.authorName}</span>
                          <span className="text-sm text-blue-600">
                            {new Date(reply.timestamp).toLocaleDateString('id-ID', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-blue-800 whitespace-pre-wrap">{reply.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Admin Decision */}
                {report.adminDecision && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Keputusan Admin:</h4>
                    <p className="text-green-800 font-medium mb-1">{report.adminDecision}</p>
                    {report.adminNotes && (
                      <p className="text-green-700 text-sm">{report.adminNotes}</p>
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

export default ReportHistory;
