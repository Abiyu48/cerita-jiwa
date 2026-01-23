import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { BookOpen, Save, Brain, Calendar, MessageSquare, Trash2 } from 'lucide-react';

const Journal = () => {
  const { journalEntries, addJournalEntry, deleteJournalEntry } = useApp();
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateAISummary = (text) => {
    const words = text.trim().split(/\s+/).length;
    if (words < 10) {
      return 'Tulisan terlalu pendek (minimal 10 kata) untuk dianalisis oleh AI. Tambahkan detail lebih lanjut tentang perasaanmu hari ini.';
    }

    // Simple AI simulation - in real app, this would call an AI API
    const summaries = [
      'Saya merasakan bahwa Anda sedang mengalami perasaan positif hari ini. Terus jaga semangat dan positivity ini!',
      'Tulisan Anda menunjukkan adanya refleksi mendalam tentang perasaan Anda. Ini adalah langkah baik untuk memahami diri sendiri.',
      'Saya melihat ada campuran emosi dalam tulisan Anda. Mari kita bahas lebih lanjut bagaimana cara mengelola emosi ini.',
      'Terima kasih telah berbagi perasaan Anda. Ini menunjukkan keberanian untuk introspeksi diri.',
      'Dari tulisan Anda, saya merasakan ada harapan dan motivasi. Tetap semangat dalam perjalanan ini!'
    ];

    return summaries[Math.floor(Math.random() * summaries.length)];
  };

  const handleSave = () => {
    if (content.trim()) {
      setIsAnalyzing(true);
      // Simulate AI processing time
      setTimeout(() => {
        const aiSummary = generateAISummary(content);
        addJournalEntry('', content, aiSummary);
        setContent('');
        setIsAnalyzing(false);
      }, 1500);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Soft Background Blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="blob w-96 h-96 bg-blue-200 top-20 -left-20 animate-float-soft"></div>
        <div className="blob w-80 h-80 bg-purple-200 top-1/3 -right-32 animate-float-soft-reverse"></div>
        <div className="blob w-72 h-72 bg-blue-300 bottom-32 left-1/4 animate-float-soft-delayed"></div>
        <div className="blob w-64 h-64 bg-purple-300 bottom-1/3 right-1/4 animate-float-soft"></div>
      </div>

      <div className="px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Header */}
          <div className="text-center slide-up">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Journal Mood</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Curahkan isi hatimu, biarkan AI memahami dan membantu menenangkan jiwamu.
            </p>
          </div>

          {/* Journal Input */}
          <Card className="p-8 slide-up">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Apa yang kamu rasakan hari ini?
                </h2>
                <p className="text-gray-600 mb-4">
                  Tulis apapun yang ada di pikiranmu... Tidak ada yang salah atau benar di sini.
                </p>
              </div>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Mulai menulis perasaan Anda hari ini..."
                className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={isAnalyzing}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Brain className="w-5 h-5" />
                  <span className="text-sm">Analisis dengan AI</span>
                </div>

                <Button
                  onClick={handleSave}
                  disabled={!content.trim() || isAnalyzing}
                  className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Menganalisis...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Simpan Jurnal</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Previous Journals */}
          {journalEntries.length > 0 && (
            <Card className="p-8 slide-up">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-6 h-6 text-gray-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">Jurnal Sebelumnya</h2>
                </div>

                <div className="space-y-4">
                  {journalEntries.map((entry) => (
                    <div key={entry.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            {formatDate(entry.date)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1 text-blue-600">
                              <MessageSquare className="w-4 h-4" />
                              <span className="text-sm">AI Summary</span>
                            </div>
                            <button
                              onClick={() => deleteJournalEntry(entry.id)}
                              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                              title="Hapus jurnal"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-800 whitespace-pre-wrap">{entry.content}</p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                          <div className="flex items-start space-x-2">
                            <Brain className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-blue-800 mb-1">AI Summary</h4>
                              <p className="text-blue-700 text-sm">{entry.emotion}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {journalEntries.length === 0 && (
            <div className="text-center py-12 slide-up">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada jurnal yang ditulis. Mulai curahkan perasaan Anda hari ini!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;