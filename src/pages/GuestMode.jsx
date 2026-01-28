import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {
  Heart,
  BookOpen,
  Lightbulb,
  Headphones,
  Eye,
  CheckCircle,
  UserPlus,
  Wind,
  User,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Lock,
  ArrowRight,
  Check,
  MessageCircle,
  GraduationCap,
  TrendingUp,
  Calendar,
  Brain,
  Send,
  Plus,
  Filter,
  Trash2,
  Clock,
  AlertTriangle,
  Menu,
  X,
  Smile,
  Meh,
  Frown,
  Angry
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

const GuestMode = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [cbtStep, setCbtStep] = useState(1);
  const [cbtData, setCbtData] = useState({
    situation: '',
    thoughts: '',
    evidence: '',
    alternative: ''
  });
  const [cbtCompleted, setCbtCompleted] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [journalText, setJournalText] = useState('');
  const [playingAudio, setPlayingAudio] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const moodOptions = [
    { value: 5, emoji: '😄', label: 'Sangat Bahagia', color: 'from-green-400 to-emerald-500' },
    { value: 4, emoji: '😊', label: 'Bahagia', color: 'from-green-300 to-green-400' },
    { value: 3, emoji: '😐', label: 'Biasa Saja', color: 'from-yellow-300 to-yellow-400' },
    { value: 2, emoji: '😔', label: 'Sedih', color: 'from-orange-300 to-orange-400' },
    { value: 1, emoji: '😢', label: 'Sangat Sedih', color: 'from-red-400 to-red-500' },
  ];

  const audioExercises = [
    {
      id: 'breathing',
      title: 'Pernapasan 4-7-8',
      duration: '3 menit',
      description: 'Teknik pernapasan untuk menenangkan pikiran',
      icon: Wind,
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'bodyscan',
      title: 'Body Scan Relaxation',
      duration: '8 menit',
      description: 'Relaksasi tubuh dari kepala hingga kaki',
      icon: User,
      gradient: 'from-purple-400 to-pink-500'
    }
  ];

  const articles = [
    {
      category: "Akademik",
      title: "Mengatasi Burnout Akademik",
      excerpt: "Pelajari cara mengenali tanda-tanda burnout dan strategi efektif untuk mengatasinya.",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      category: "Teknik",
      title: "Pentingnya Mindfulness",
      excerpt: "Pelajari pentingnya mindfulness dalam kehidupan sehari-hari dan bagaimana menerapkannya.",
      gradient: "from-green-400 to-emerald-600"
    },
    {
      category: "Kesehatan Mental",
      title: "Mengenali Tanda-tanda Depresi",
      excerpt: "Panduan untuk mengenali gejala depresi dan kapan harus mencari bantuan profesional.",
      gradient: "from-purple-400 to-purple-600"
    },
    {
      category: "Hubungan Sosial",
      title: "Membangun Keterampilan Sosial",
      excerpt: "Tips dan teknik untuk meningkatkan kemampuan berkomunikasi dan membangun hubungan yang sehat.",
      gradient: "from-pink-400 to-rose-600"
    }
  ];

  const features = [
    { icon: Heart, title: 'Mood Tracker', desc: 'Pantau suasana hati Anda', gradient: 'from-rose-400 to-pink-500', tab: 'mood' },
    { icon: BookOpen, title: 'Journal Mood', desc: 'Catat pikiran dan perasaan', gradient: 'from-purple-400 to-indigo-500', tab: 'journal' },
    { icon: MessageCircle, title: 'AI Companion', desc: 'Curhat dengan AI empati', gradient: 'from-pink-400 to-rose-500', tab: 'ai-chat' },
    { icon: GraduationCap, title: 'Edukasi Mental', desc: 'Pelajari kesehatan mental', gradient: 'from-green-400 to-emerald-500', tab: 'education' },
    { icon: Lightbulb, title: 'CBT Exercise', desc: 'Latihan terapi kognitif', gradient: 'from-amber-400 to-orange-500', tab: 'cbt' },
    { icon: Headphones, title: 'Audio Relaksasi', desc: 'Panduan meditasi dan relaksasi', gradient: 'from-blue-400 to-cyan-500', tab: 'audio' }
  ];

  const handleCbtNext = () => {
    if (cbtStep < 4) {
      setCbtStep(cbtStep + 1);
    } else {
      setCbtCompleted(true);
    }
  };

  const handleCbtPrev = () => {
    if (cbtStep > 1) {
      setCbtStep(cbtStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-indigo-50 relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .btn-secondary {
          background: white;
          color: #059669;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 2px solid #10b981;
        }
        .btn-secondary:hover {
          background: #f0fdf4;
        }
      `}</style>

      {/* Header */}
      <Card as="header" className="fixed top-0 left-0 right-0 z-50 mx-4 mt-2 px-6 py-4 fade-in">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-300 to-sky-400 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">Cerita Jiwa</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-600 hover:text-emerald-500 font-medium transition-colors duration-500">Home</a>
            <a href="#about" className="text-gray-600 hover:text-emerald-500 font-medium transition-colors duration-500">About</a>
            <a href="#fitur" className="text-gray-600 hover:text-emerald-500 font-medium transition-colors duration-500">Fitur</a>
            <a href="#insight" className="text-gray-600 hover:text-emerald-500 font-medium transition-colors duration-500">Insight</a>
            <div className="flex items-center space-x-3">
              <a href="/login" className="btn-secondary">Masuk</a>
              <a href="/guest" className="text-sm text-gray-500 hover:text-emerald-500 transition-colors duration-500">Mode Guest</a>
            </div>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 slide-up">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-emerald-600 transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-emerald-600 transition-colors">About</a>
              <a href="#fitur" className="text-gray-700 hover:text-emerald-600 transition-colors">Fitur</a>
              <a href="#insight" className="text-gray-700 hover:text-emerald-600 transition-colors">Insight</a>
              <a href="/login" className="btn-secondary text-center">Masuk</a>
              <a href="/guest" className="text-center text-sm text-gray-600">Mode Guest</a>
            </div>
          </div>
        )}
      </Card>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 pt-28 md:pt-32 pb-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-float">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-3xl mb-6 shadow-lg">
            <Eye className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Mode Tamu
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-6">
            Eksplorasi fitur kesehatan mental kami tanpa perlu akun. Daftar untuk menyimpan progress Anda.
          </p>
        </div>

        {/* Overview Section */}
        {activeTab === 'overview' && (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(feature.tab)}
                  className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-left"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.desc}</p>
                  <div className="flex items-center text-emerald-600 font-semibold group-hover:gap-2 transition-all">
                    Coba Sekarang
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl p-12 text-center text-white shadow-2xl animate-gradient">
              <Sparkles className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Siap untuk Pengalaman Lengkap?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Daftar sekarang untuk menyimpan progress, melacak perkembangan mood, dan mendapatkan insight personal dari AI.
              </p>
              <Link to="/register" className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all hover:scale-105 inline-flex items-center gap-2 shadow-lg">
                <UserPlus className="w-6 h-6" />
                Daftar Gratis Sekarang
              </Link>
              <p className="mt-4 text-white/80 text-sm">
                <Lock className="w-4 h-4 inline mr-1" />
                100% gratis, aman, dan privasi terjaga
              </p>
            </div>
          </div>
        )}

        {/* CBT Exercise Tab */}
        {activeTab === 'cbt' && (
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className="mb-6 text-gray-600 hover:text-emerald-600 transition-colors inline-flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali ke Overview
            </button>
            
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl mb-4">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">CBT Exercise</h2>
                <p className="text-gray-600 mt-2">Latihan Terapi Kognitif Perilaku</p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-6">
                <p className="text-amber-800 text-center">
                  <Lock className="w-5 h-5 inline mr-2" />
                  <strong>Mode Tamu:</strong> Progress latihan CBT ini tidak akan disimpan. Daftar untuk melacak perkembangan latihan Anda dan mendapatkan rekomendasi personal.
                </p>
              </div>

              {cbtCompleted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Luar Biasa! 🎉</h3>
                  <p className="text-gray-600 mb-8 text-lg">Anda telah menyelesaikan latihan CBT dengan baik.</p>
                  <button
                    onClick={() => {
                      setCbtCompleted(false);
                      setCbtStep(1);
                      setCbtData({situation: '', thoughts: '', evidence: '', alternative: ''});
                    }}
                    className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all hover:scale-105"
                  >
                    Mulai Latihan Baru
                  </button>
                </div>
              ) : (
                <>
                  {/* Progress */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-600">Langkah {cbtStep} dari 4</span>
                      <span className="text-sm font-medium text-emerald-600">{Math.round((cbtStep/4)*100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
                        style={{width: `${(cbtStep/4)*100}%`}}
                      ></div>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="mb-8">
                    {cbtStep === 1 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">1. Situasi</h3>
                        <p className="text-gray-600 mb-4">Jelaskan situasi yang memicu pikiran negatif Anda.</p>
                        <textarea
                          value={cbtData.situation}
                          onChange={(e) => setCbtData({...cbtData, situation: e.target.value})}
                          className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-amber-400 focus:outline-none transition-colors"
                          rows="5"
                          placeholder="Contoh: Saya mendapat nilai buruk di ujian matematika..."
                        />
                      </div>
                    )}
                    {cbtStep === 2 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">2. Pikiran Otomatis</h3>
                        <p className="text-gray-600 mb-4">Apa pikiran yang langsung muncul di kepala Anda?</p>
                        <textarea
                          value={cbtData.thoughts}
                          onChange={(e) => setCbtData({...cbtData, thoughts: e.target.value})}
                          className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-amber-400 focus:outline-none transition-colors"
                          rows="5"
                          placeholder="Contoh: Saya bodoh dan tidak akan pernah berhasil..."
                        />
                      </div>
                    )}
                    {cbtStep === 3 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">3. Bukti</h3>
                        <p className="text-gray-600 mb-4">Apa bukti yang mendukung atau menentang pikiran ini?</p>
                        <textarea
                          value={cbtData.evidence}
                          onChange={(e) => setCbtData({...cbtData, evidence: e.target.value})}
                          className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-amber-400 focus:outline-none transition-colors"
                          rows="5"
                          placeholder="Bukti yang mendukung: ...&#10;&#10;Bukti yang menentang: ..."
                        />
                      </div>
                    )}
                    {cbtStep === 4 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">4. Pikiran Alternatif</h3>
                        <p className="text-gray-600 mb-4">Buat pikiran alternatif yang lebih seimbang dan realistis.</p>
                        <textarea
                          value={cbtData.alternative}
                          onChange={(e) => setCbtData({...cbtData, alternative: e.target.value})}
                          className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-amber-400 focus:outline-none transition-colors"
                          rows="5"
                          placeholder="Contoh: Satu nilai buruk tidak menentukan kemampuan saya secara keseluruhan..."
                        />
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleCbtPrev}
                      disabled={cbtStep === 1}
                      className="flex-1 px-6 py-4 rounded-2xl font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      <ChevronLeft className="w-5 h-5 inline mr-2" />
                      Sebelumnya
                    </button>
                    <button
                      onClick={handleCbtNext}
                      className="flex-1 px-6 py-4 rounded-2xl font-semibold transition-all bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-lg hover:scale-105"
                    >
                      {cbtStep === 4 ? 'Selesai' : 'Selanjutnya'}
                      <ChevronRight className="w-5 h-5 inline ml-2" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Mood Tracker Tab */}
        {activeTab === 'mood' && (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className="mb-6 text-gray-600 hover:text-emerald-600 transition-colors inline-flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali ke Overview
            </button>
            
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Mood Tracker</h2>
                <p className="text-xl text-gray-600">Bagaimana perasaan Anda hari ini?</p>
              </div>

              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 mb-6">
                <p className="text-rose-800 text-center">
                  <Lock className="w-5 h-5 inline mr-2" />
                  <strong>Mode Tamu:</strong> Data mood ini tidak akan disimpan. Daftar untuk melacak perkembangan mood Anda dari waktu ke waktu.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood)}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      selectedMood?.value === mood.value
                        ? 'border-emerald-500 bg-emerald-50 scale-105 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-4xl mb-2">{mood.emoji}</div>
                    <div className={`text-xs font-semibold bg-gradient-to-r ${mood.color} bg-clip-text text-transparent`}>
                      {mood.label}
                    </div>
                  </button>
                ))}
              </div>

              {selectedMood && (
                <div className="text-center bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl p-8">
                  <Check className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Terima kasih telah berbagi!</h3>
                  <p className="text-gray-600 mb-6">
                    Anda merasa <span className="font-semibold">{selectedMood.label}</span> hari ini.
                  </p>
                  <button
                    onClick={() => setSelectedMood(null)}
                    className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:shadow-md transition-all"
                  >
                    Pilih Mood Lain
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Journal Tab */}
        {activeTab === 'journal' && (
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className="mb-6 text-gray-600 hover:text-emerald-600 transition-colors inline-flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali ke Overview
            </button>
            
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Jurnal Harian</h2>
                <p className="text-gray-600">Catat pikiran dan perasaan Anda hari ini</p>
              </div>

              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:outline-none transition-colors mb-6"
                rows="10"
                placeholder="Apa yang terjadi hari ini? Bagaimana perasaan Anda?&#10;&#10;Tulis dengan bebas, tidak ada yang akan menghakimi..."
              />

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 mb-6">
                <p className="text-purple-800 text-center">
                  <Lock className="w-5 h-5 inline mr-2" />
                  <strong>Mode Tamu:</strong> Jurnal ini tidak akan disimpan. Daftar untuk menyimpan semua catatan perasaan Anda dengan aman dan mendapatkan analisis AI.
                </p>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-all hover:scale-105">
                Simpan Jurnal (Mode Tamu)
              </button>
            </div>
          </div>
        )}

        {/* Audio Tab */}
        {activeTab === 'audio' && (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className="mb-6 text-gray-600 hover:text-emerald-600 transition-colors inline-flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali ke Overview
            </button>
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl mb-4 mx-auto">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Audio Relaksasi</h2>
              <p className="text-gray-600">Panduan meditasi untuk menenangkan pikiran</p>
            </div>

            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
                <p className="text-blue-800 text-center">
                  <Lock className="w-5 h-5 inline mr-2" />
                  <strong>Mode Tamu:</strong> Audio relaksasi tersedia untuk dicoba. Daftar untuk mengakses koleksi lengkap meditasi dan relaksasi.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {audioExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className={`bg-gradient-to-br ${exercise.gradient} p-8 text-white`}>
                    <exercise.icon className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{exercise.title}</h3>
                    <p className="text-white/90">{exercise.description}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600 font-medium">{exercise.duration}</span>
                      <button
                        onClick={() => setPlayingAudio(playingAudio === exercise.id ? null : exercise.id)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          playingAudio === exercise.id
                            ? 'bg-gradient-to-br from-rose-400 to-pink-500 text-white shadow-lg scale-110'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {playingAudio === exercise.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                      </button>
                    </div>
                    
                    {playingAudio === exercise.id && (
                      <div>
                        <div className="bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${exercise.gradient} rounded-full w-1/3`}></div>
                        </div>
                        <p className="text-sm text-gray-600">Sedang memutar...</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Chat Tab */}
        {activeTab === 'ai-chat' && (
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className="mb-6 text-gray-600 hover:text-emerald-600 transition-colors inline-flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali ke Overview
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl mb-4 mx-auto">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">AI Companion</h2>
              <p className="text-gray-600">Teman curhat AI yang selalu siap mendengarkan</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Jiwamu - Teman Curhat AI</h3>
                  <p className="text-gray-600">Selalu siap mendengarkan tanpa menghakimi</p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 mb-6">
                  <p className="text-pink-800 text-center">
                    <Lock className="w-5 h-5 inline mr-2" />
                    <strong>Mode Tamu:</strong> Percakapan ini tidak akan disimpan. Daftar untuk menyimpan riwayat curhat Anda.
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-800">Hai! Aku Jiwamu. Aku di sini untuk mendengarkan curhatanmu. Ceritakan apa yang sedang kamu rasakan saat ini. 💙</p>
                        <p className="text-xs text-gray-500 mt-1">Baru saja</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-gray-600 text-center italic">
                    "Mulai percakapan dengan mengetik pesan Anda di bawah ini..."
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="Tulis pesan Anda di sini..."
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-pink-400 focus:outline-none transition-colors"
                      disabled
                    />
                    <button
                      className="px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all hover:scale-105 opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Fitur chat aktif setelah daftar akun
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className="mb-6 text-gray-600 hover:text-emerald-600 transition-colors inline-flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali ke Overview
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mb-4 mx-auto">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Edukasi Mental</h2>
              <p className="text-gray-600">Pelajari tentang kesehatan mental dari ahli</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                >
                  <div className={`h-3 bg-gradient-to-r ${article.gradient}`}></div>
                  <div className="p-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                      {article.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{article.excerpt}</p>
                    <button className="inline-flex items-center text-emerald-600 font-semibold group-hover:gap-2 transition-all">
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GuestMode;