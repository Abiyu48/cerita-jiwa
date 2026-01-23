import { useState, useEffect, useRef } from 'react';
import { FileText, MessageCircle, Send, Clock, CheckCircle, AlertCircle, User } from 'lucide-react';

const ReportPage = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState({
    category: '',
    description: ''
  });
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const categories = [
    { value: 'konten_sensitif', label: 'Konten Sensitif', icon: '⚠️' },
    { value: 'masalah_akun', label: 'Masalah Akun', icon: '👤' },
    { value: 'bug_sistem', label: 'Bug Sistem', icon: '🐛' },
    { value: 'ketidaknyamanan_layanan', label: 'Ketidaknyamanan Layanan', icon: '😔' }
  ];

  useEffect(() => {
    const mockReports = [
      {
        id: '001',
        category: 'bug_sistem',
        description: 'Aplikasi sering crash saat membuka fitur jurnal',
        status: 'diproses',
        createdAt: new Date('2025-01-20'),
        messages: [
          {
            id: 1,
            sender: 'user',
            text: 'Aplikasi sering crash saat membuka fitur jurnal',
            timestamp: new Date('2025-01-20T10:00:00')
          },
          {
            id: 2,
            sender: 'cs',
            text: 'Terima kasih telah melaporkan masalah ini. Tim teknis kami sedang menyelidiki penyebabnya. Bisakah Anda memberitahu kami jenis perangkat yang Anda gunakan?',
            timestamp: new Date('2025-01-20T10:15:00'),
            csName: 'Rina - CS Support'
          }
        ]
      }
    ];
    setReports(mockReports);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedReport) {
      scrollToBottom();
    }
  }, [selectedReport?.messages]);

  const handleSubmit = () => {
    if (!formData.category || !formData.description.trim()) {
      alert('Mohon lengkapi semua field');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const newReport = {
        id: Date.now().toString(),
        category: formData.category,
        description: formData.description,
        status: 'baru',
        createdAt: new Date(),
        messages: [
          {
            id: 1,
            sender: 'user',
            text: formData.description,
            timestamp: new Date()
          },
          {
            id: 2,
            sender: 'cs',
            text: 'Terima kasih telah menghubungi kami. Laporan Anda telah kami terima dan sedang dalam proses peninjauan. Tim Customer Support kami akan segera merespons.',
            timestamp: new Date(),
            csName: 'System - Auto Response'
          }
        ]
      };

      setReports([newReport, ...reports]);
      setFormData({ category: '', description: '' });
      setLoading(false);
      setActiveTab('history');
      alert('Laporan berhasil dikirim! Tim CS akan segera merespons.');
    }, 1000);
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim() || !selectedReport) return;

    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: chatMessage,
      timestamp: new Date()
    };

    const updatedReports = reports.map(report => {
      if (report.id === selectedReport.id) {
        return {
          ...report,
          messages: [...report.messages, newMessage]
        };
      }
      return report;
    });

    setReports(updatedReports);
    setSelectedReport({
      ...selectedReport,
      messages: [...selectedReport.messages, newMessage]
    });
    setChatMessage('');

    setTimeout(() => {
      const csResponse = {
        id: Date.now() + 1,
        sender: 'cs',
        text: 'Terima kasih atas informasi tambahannya. Kami akan segera menindaklanjuti.',
        timestamp: new Date(),
        csName: 'Rina - CS Support'
      };

      const updatedWithResponse = reports.map(report => {
        if (report.id === selectedReport.id) {
          return {
            ...report,
            messages: [...report.messages, newMessage, csResponse]
          };
        }
        return report;
      });

      setReports(updatedWithResponse);
      setSelectedReport({
        ...selectedReport,
        messages: [...selectedReport.messages, newMessage, csResponse]
      });
    }, 2000);
  };

  const getStatusBadge = (status) => {
    const badges = {
      baru: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock, label: 'Baru' },
      diproses: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertCircle, label: 'Diproses' },
      selesai: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Selesai' }
    };
    const badge = badges[status] || badges.baru;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {badge.label}
      </span>
    );
  };

  const getCategoryLabel = (value) => {
    return categories.find(c => c.value === value)?.label || value;
  };

  const getCategoryIcon = (value) => {
    return categories.find(c => c.value === value)?.icon || '📝';
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-sky-200/30 rounded-full blur-3xl top-1/3 -right-32 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl bottom-32 left-1/4 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto mb-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Pusat <span className="text-emerald-500">Bantuan</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Laporkan masalah atau berkomunikasi langsung dengan Customer Support kami
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-emerald-400 to-sky-500 text-white shadow-lg'
                  : 'bg-white/70 text-gray-600 hover:bg-white'
              }`}
            >
              <FileText className="w-5 h-5 inline-block mr-2" />
              Buat Laporan
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-emerald-400 to-sky-500 text-white shadow-lg'
                  : 'bg-white/70 text-gray-600 hover:bg-white'
              }`}
            >
              <MessageCircle className="w-5 h-5 inline-block mr-2" />
              Riwayat & Chat CS
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {activeTab === 'create' ? (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-emerald-200/60 shadow-lg p-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Kategori Laporan
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categories.map((category) => (
                        <button
                          key={category.value}
                          type="button"
                          onClick={() => setFormData({...formData, category: category.value})}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            formData.category === category.value
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                              : 'border-gray-200 hover:border-emerald-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{category.icon}</span>
                            <span className="font-medium">{category.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deskripsi Laporan
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Jelaskan secara detail masalah yang Anda alami..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white resize-none"
                      rows={6}
                      maxLength={1000}
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      {formData.description.length}/1000 karakter
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Mengirim...' : 'Kirim Laporan'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-emerald-200/60 shadow-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Laporan Anda</h3>
                  {reports.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Belum ada laporan</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto">
                      {reports.map((report) => (
                        <div
                          key={report.id}
                          onClick={() => setSelectedReport(report)}
                          className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                            selectedReport?.id === report.id
                              ? 'bg-emerald-50 ring-2 ring-emerald-300'
                              : 'hover:bg-gray-50 bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl">{getCategoryIcon(report.category)}</span>
                              <h4 className="font-medium text-gray-800 text-sm">
                                {getCategoryLabel(report.category)}
                              </h4>
                            </div>
                            {getStatusBadge(report.status)}
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                            {report.description}
                          </p>
                          <div className="text-xs text-gray-400">
                            {new Date(report.createdAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                {selectedReport ? (
                  <div className="h-[600px] flex flex-col bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-emerald-200/60 shadow-lg">
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800 flex items-center">
                            <span className="text-xl mr-2">{getCategoryIcon(selectedReport.category)}</span>
                            {getCategoryLabel(selectedReport.category)}
                          </h3>
                          <p className="text-sm text-gray-600">Laporan #{selectedReport.id}</p>
                        </div>
                        {getStatusBadge(selectedReport.status)}
                      </div>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto space-y-4">
                      {selectedReport.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-md px-4 py-3 rounded-2xl ${
                              message.sender === 'user'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {message.sender === 'cs' && (
                              <div className="flex items-center space-x-2 mb-1">
                                <User className="w-3 h-3 text-emerald-600" />
                                <p className="text-xs font-semibold text-emerald-600">
                                  {message.csName}
                                </p>
                              </div>
                            )}
                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-emerald-200' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    <div className="p-6 border-t border-gray-100">
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                          placeholder="Balas ke Customer Support..."
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                        />
                        <button
                          onClick={sendChatMessage}
                          disabled={!chatMessage.trim()}
                          className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-[600px] flex items-center justify-center bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-emerald-200/60 shadow-lg">
                    <div className="text-center">
                      <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Pilih Laporan
                      </h3>
                      <p className="text-gray-600">
                        Pilih laporan dari daftar untuk berkomunikasi dengan CS
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;