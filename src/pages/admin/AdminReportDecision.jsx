import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const AdminReportDecision = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [decision, setDecision] = useState('');
  const [notes, setNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      const [reportResponse, auditResponse] = await Promise.all([
        fetch(`/api/reports/${id}`),
        fetch(`/api/reports/${id}/audit`)
      ]);

      if (!reportResponse.ok) {
        throw new Error('Gagal memuat laporan');
      }

      const reportData = await reportResponse.json();
      setReport(reportData);

      if (auditResponse.ok) {
        const auditData = await auditResponse.json();
        setAuditLogs(auditData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMakeDecision = async () => {
    if (!decision) {
      setError('Mohon pilih keputusan');
      return;
    }

    setActionLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/reports/${id}/decision`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          decision,
          adminId: user.id,
          notes: notes.trim()
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal membuat keputusan');
      }

      await fetchReport(); // Refresh data
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
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

  const decisionOptions = [
    { value: 'disetujui', label: 'Disetujui - Tindakan CS sesuai', color: 'bg-green-100 text-green-800' },
    { value: 'ditolak', label: 'Ditolak - Perlu tindakan berbeda', color: 'bg-red-100 text-red-800' },
    { value: 'ditinjau_ulang', label: 'Perlu Ditinjau Ulang', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'eskalasi_lanjutan', label: 'Eskalasi Lanjutan', color: 'bg-purple-100 text-purple-800' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mint-50 to-emerald-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-500"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mint-50 to-emerald-50 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Laporan tidak ditemukan</h1>
          <Button onClick={() => navigate('/admin/reports')}>Kembali ke Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-emerald-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Keputusan Laporan #{report.id.slice(-6)}
            </h1>
            <p className="text-gray-600">
              Ambil keputusan akhir untuk laporan yang dieskalasi.
            </p>
          </div>
          <Button onClick={() => navigate('/admin/reports')} variant="secondary">
            Kembali ke Dashboard
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="p-4 mb-6 bg-red-50 border-red-200">
            <p className="text-red-600">{error}</p>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Details */}
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-500">ID: #{report.id.slice(-6)}</span>
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

              {/* Escalation Reason */}
              {report.escalationReason && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-medium text-orange-900 mb-2">Alasan Eskalasi:</h4>
                  <p className="text-orange-800">{report.escalationReason}</p>
                </div>
              )}
            </Card>

            {/* CS Replies */}
            {report.replies && report.replies.length > 0 && (
              <Card className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">Balasan Customer Support</h3>
                <div className="space-y-4">
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
              </Card>
            )}

            {/* Admin Decision Form */}
            {!report.adminDecision && (
              <Card className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">Ambil Keputusan</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Keputusan Admin
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {decisionOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setDecision(option.value)}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            decision === option.value
                              ? 'border-mint-500 bg-mint-50 text-mint-700'
                              : 'border-gray-200 hover:border-mint-300 bg-white'
                          }`}
                        >
                          <div className="font-medium">{option.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catatan Keputusan (Opsional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tambahkan catatan atau instruksi khusus..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white/70 backdrop-blur-sm resize-none"
                      rows={3}
                      maxLength={500}
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      {notes.length}/500 karakter
                    </div>
                  </div>

                  <Button
                    onClick={handleMakeDecision}
                    disabled={!decision || actionLoading}
                    className="w-full"
                  >
                    {actionLoading ? 'Menyimpan Keputusan...' : 'Simpan Keputusan'}
                  </Button>
                </div>
              </Card>
            )}

            {/* Admin Decision Display */}
            {report.adminDecision && (
              <Card className="p-6 bg-green-50 border-green-200">
                <h3 className="font-medium text-green-900 mb-4">Keputusan Admin</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-green-900">Keputusan:</span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {decisionOptions.find(opt => opt.value === report.adminDecision)?.label || report.adminDecision}
                    </span>
                  </div>
                  {report.adminNotes && (
                    <div>
                      <span className="font-medium text-green-900">Catatan:</span>
                      <p className="text-green-800 mt-1 whitespace-pre-wrap">{report.adminNotes}</p>
                    </div>
                  )}
                  <div className="text-sm text-green-700">
                    Diputuskan pada {new Date(report.updatedAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Audit Logs */}
            {auditLogs.length > 0 && (
              <Card className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">Log Aktivitas</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="text-sm border-l-2 border-gray-200 pl-3">
                      <p className="font-medium text-gray-900">{log.action.replace('_', ' ')}</p>
                      <p className="text-gray-600">{log.details}</p>
                      <p className="text-gray-500 text-xs">
                        {new Date(log.timestamp).toLocaleDateString('id-ID', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Report Summary */}
            <Card className="p-6">
              <h3 className="font-medium text-gray-900 mb-4">Ringkasan Laporan</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {getStatusText(report.status)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prioritas:</span>
                  <span className="font-medium">{report.priority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Balasan CS:</span>
                  <span className="font-medium">{report.replies?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dieskalasi:</span>
                  <span className={`font-medium ${report.escalated ? 'text-orange-600' : 'text-gray-600'}`}>
                    {report.escalated ? 'Ya' : 'Tidak'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportDecision;
