import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const HandleReport = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [escalationReason, setEscalationReason] = useState('');
  const [showEscalateModal, setShowEscalateModal] = useState(false);
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

  const handleStatusChange = async () => {
    if (!newStatus) return;

    setActionLoading(true);
    try {
      const response = await fetch(`/api/reports/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          csId: user.id
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal mengubah status');
      }

      await fetchReport(); // Refresh data
      setNewStatus('');
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReply = async () => {
    if (!replyMessage.trim()) return;

    setActionLoading(true);
    try {
      const response = await fetch(`/api/reports/${id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: replyMessage.trim(),
          csId: user.id,
          csName: user.name
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal mengirim balasan');
      }

      await fetchReport(); // Refresh data
      setReplyMessage('');
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEscalate = async () => {
    if (!escalationReason.trim()) return;

    setActionLoading(true);
    try {
      const response = await fetch(`/api/reports/${id}/escalate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          csId: user.id,
          reason: escalationReason.trim()
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal escalate laporan');
      }

      await fetchReport(); // Refresh data
      setShowEscalateModal(false);
      setEscalationReason('');
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
          <Button onClick={() => navigate('/support/dashboard')}>Kembali ke Dashboard</Button>
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
              Tangani Laporan #{report.id.slice(-6)}
            </h1>
            <p className="text-gray-600">
              Baca dan tanggapi laporan pengguna dengan empati.
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

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{report.description}</p>
              </div>
            </Card>

            {/* Replies */}
            {report.replies && report.replies.length > 0 && (
              <Card className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">Riwayat Balasan</h3>
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

            {/* Reply Form */}
            {!report.escalated && (
              <Card className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">Kirim Balasan</h3>
                <div className="space-y-4">
                  <div>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Tulis balasan dengan empati dan dukungan..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white/70 backdrop-blur-sm resize-none"
                      rows={4}
                      maxLength={1000}
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      {replyMessage.length}/1000 karakter
                    </div>
                  </div>
                  <Button
                    onClick={handleReply}
                    disabled={!replyMessage.trim() || actionLoading}
                    className="w-full"
                  >
                    {actionLoading ? 'Mengirim...' : 'Kirim Balasan'}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Management */}
            <Card className="p-6">
              <h3 className="font-medium text-gray-900 mb-4">Kelola Status</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ubah Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white/70 backdrop-blur-sm"
                  >
                    <option value="">Pilih status baru</option>
                    <option value="diproses">Diproses</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </div>
                <Button
                  onClick={handleStatusChange}
                  disabled={!newStatus || actionLoading}
                  variant="secondary"
                  className="w-full"
                >
                  {actionLoading ? 'Menyimpan...' : 'Ubah Status'}
                </Button>
              </div>
            </Card>

            {/* Escalate to Admin */}
            {!report.escalated && (
              <Card className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">Eskalasi ke Admin</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Jika laporan ini memerlukan keputusan admin, Anda dapat mengeskalasikannya.
                </p>
                <Button
                  onClick={() => setShowEscalateModal(true)}
                  variant="outline"
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  Eskalasi ke Admin
                </Button>
              </Card>
            )}

            {/* Audit Logs */}
            {auditLogs.length > 0 && (
              <Card className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">Log Aktivitas</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
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
          </div>
        </div>

        {/* Escalate Modal */}
        {showEscalateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Eskalasi ke Admin</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alasan Eskalasi
                  </label>
                  <textarea
                    value={escalationReason}
                    onChange={(e) => setEscalationReason(e.target.value)}
                    placeholder="Jelaskan mengapa laporan ini perlu eskalasi..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white/70 backdrop-blur-sm resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowEscalateModal(false)}
                    variant="secondary"
                    className="flex-1"
                  >
                    Batal
                  </Button>
                  <Button
                    onClick={handleEscalate}
                    disabled={!escalationReason.trim() || actionLoading}
                    className="flex-1"
                  >
                    {actionLoading ? 'Mengirim...' : 'Eskalasi'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default HandleReport;
