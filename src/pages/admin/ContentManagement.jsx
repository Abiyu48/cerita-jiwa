import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  BookOpen,
  Heart,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search,
  Plus,
  MessageSquare,
  Lightbulb,
  Quote,
  Shield,
  Flag,
  MoreVertical,
  ChevronDown,
  Tag,
  Calendar,
  User,
  Activity
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

const ContentManagement = () => {
  const { user, getAllContent, updateContentStatus, logAdminAction } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContent, setSelectedContent] = useState(null);
  const [contents, setContents] = useState([]);

  // Load content data on component mount
  useEffect(() => {
    const loadContents = () => {
      const allContents = getAllContent();
      setContents(allContents);
    };

    loadContents();
  }, [getAllContent]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'journal': return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'article': return <FileText className="w-5 h-5 text-green-500" />;
      case 'quote': return <Quote className="w-5 h-5 text-purple-500" />;
      case 'education': return <Lightbulb className="w-5 h-5 text-orange-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'flagged': return 'text-red-600 bg-red-100';
      case 'rejected': return 'text-gray-600 bg-gray-100';
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

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || content.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || content.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleContentAction = (contentId, action) => {
    // In a real app, this would make API calls
    console.log(`Performing ${action} on content ${contentId}`);
    setContents(contents.map(content =>
      content.id === contentId
        ? { ...content, status: action === 'approve' ? 'published' :
                           action === 'reject' ? 'rejected' :
                           action === 'hide' ? 'flagged' : content.status }
        : content
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Kelola Konten</h1>
              <p className="text-gray-600 mt-1">Atur seluruh konten kesehatan mental di platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Konten</p>
                <p className="text-2xl font-bold text-gray-800">{contents.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Konten Dipublikasikan</p>
                <p className="text-3xl font-bold text-gray-800">
                  {contents.filter(c => c.status === 'published').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Menunggu Review</p>
                <p className="text-3xl font-bold text-gray-800">
                  {contents.filter(c => c.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Konten Diflag</p>
                <p className="text-3xl font-bold text-gray-800">
                  {contents.filter(c => c.status === 'flagged').length}
                </p>
              </div>
              <Flag className="w-8 h-8 text-red-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Laporan</p>
                <p className="text-3xl font-bold text-gray-800">
                  {contents.reduce((sum, c) => sum + c.reports, 0)}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari konten..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Semua Tipe</option>
                  <option value="journal">Jurnal</option>
                  <option value="article">Artikel</option>
                  <option value="quote">Quote</option>
                  <option value="education">Edukasi</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Semua Status</option>
                  <option value="published">Dipublikasikan</option>
                  <option value="pending">Menunggu</option>
                  <option value="flagged">Diflag</option>
                  <option value="rejected">Ditolak</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </Card>

        {/* Content Table */}
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Konten</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Tipe</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Status</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Risiko</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Laporan</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredContents.map((content) => (
                  <tr key={content.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-gray-800">{content.title}</p>
                        <p className="text-sm text-gray-500">oleh {content.author}</p>
                        <p className="text-xs text-gray-400">{content.createdAt}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(content.type)}
                        <span className="text-sm font-medium capitalize">{content.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(content.status)}`}>
                        {content.status === 'published' ? 'Dipublikasikan' :
                         content.status === 'pending' ? 'Menunggu' :
                         content.status === 'flagged' ? 'Diflag' : 'Ditolak'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(content.riskLevel)}`}>
                        {content.riskLevel === 'low' ? 'Rendah' :
                         content.riskLevel === 'medium' ? 'Sedang' : 'Tinggi'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium">{content.reports}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedContent(content)}
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

        {/* Content Detail Modal */}
        {selectedContent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(selectedContent.type)}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedContent.title}</h2>
                      <p className="text-gray-600">oleh {selectedContent.author}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedContent(null)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Content Preview */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Pratinjau Konten</h3>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-700 leading-relaxed">{selectedContent.content}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Informasi Konten</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tipe:</span>
                        <span className="font-medium capitalize">{selectedContent.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedContent.status)}`}>
                          {selectedContent.status === 'published' ? 'Dipublikasikan' :
                           selectedContent.status === 'pending' ? 'Menunggu' :
                           selectedContent.status === 'flagged' ? 'Diflag' : 'Ditolak'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dibuat:</span>
                        <span className="font-medium">{selectedContent.createdAt}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Laporan:</span>
                        <span className="font-medium">{selectedContent.reports}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Analisis Risiko</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Level Risiko:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(selectedContent.riskLevel)}`}>
                          {selectedContent.riskLevel === 'low' ? 'Rendah' :
                           selectedContent.riskLevel === 'medium' ? 'Sedang' : 'Tinggi'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Kata Berisiko:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {selectedContent.sensitiveWords.length > 0 ? (
                            selectedContent.sensitiveWords.map((word, index) => (
                              <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                {word}
                              </span>
                            ))
                          ) : (
                            <span className="text-green-600 text-sm">Tidak ada kata berisiko</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Tag Emosi:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {selectedContent.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Admin Actions */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Aksi Admin</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {selectedContent.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleContentAction(selectedContent.id, 'approve')}
                          className="px-4 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 inline mr-2" />
                          Setujui
                        </button>
                        <button
                          onClick={() => handleContentAction(selectedContent.id, 'reject')}
                          className="px-4 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                        >
                          <XCircle className="w-4 h-4 inline mr-2" />
                          Tolak
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleContentAction(selectedContent.id, 'hide')}
                      className="px-4 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
                    >
                      <Eye className="w-4 h-4 inline mr-2" />
                      Sembunyikan
                    </button>
                    <button
                      onClick={() => handleContentAction(selectedContent.id, 'edit')}
                      className="px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                    >
                      <Edit className="w-4 h-4 inline mr-2" />
                      Edit
                    </button>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-800">
                      <Shield className="w-4 h-4 inline mr-1" />
                      Catatan internal: Konten ini {selectedContent.riskLevel === 'high' ? 'memerlukan perhatian khusus' :
                                                   selectedContent.riskLevel === 'medium' ? 'perlu dipantau' :
                                                   'aman untuk dipublikasikan'}.
                    </p>
                  </div>
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
                Anda telah meninjau 15 konten hari ini. Ingat untuk mengambil jeda 5 menit setelah menangani konten berisiko tinggi untuk menjaga kesehatan mental Anda sendiri.
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

export default ContentManagement;
