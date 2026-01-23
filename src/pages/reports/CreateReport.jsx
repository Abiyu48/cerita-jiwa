import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const CreateReport = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'konten_sensitif', label: 'Konten Sensitif' },
    { value: 'masalah_akun', label: 'Masalah Akun' },
    { value: 'bug_sistem', label: 'Bug Sistem' },
    { value: 'ketidaknyamanan_layanan', label: 'Ketidaknyamanan Layanan' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category || !formData.description.trim()) {
      setError('Mohon lengkapi semua field');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          category: formData.category,
          description: formData.description.trim()
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal mengirim laporan');
      }

      // Redirect to history page
      navigate('/reports/history');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-50 to-emerald-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Buat Laporan Baru
          </h1>
          <p className="text-gray-600">
            Ceritakan masalah atau keluhan Anda. Kami akan menangani dengan empati dan profesional.
          </p>
        </div>

        {/* Form */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Kategori Laporan
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => handleChange('category', category.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      formData.category === category.value
                        ? 'border-mint-500 bg-mint-50 text-mint-700'
                        : 'border-gray-200 hover:border-mint-300 bg-white'
                    }`}
                  >
                    <div className="font-medium">{category.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Laporan
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Jelaskan secara detail masalah yang Anda alami..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white/70 backdrop-blur-sm resize-none"
                rows={6}
                maxLength={1000}
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.description.length}/1000 karakter
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/reports/history')}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Mengirim...' : 'Kirim Laporan'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Laporan Anda akan ditangani oleh Customer Support kami dengan empati dan kerahasiaan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateReport;
