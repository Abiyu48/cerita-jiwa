import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  BookOpen,
  Music,
  MessageCircle,
  GraduationCap,
  Smile,
  Meh,
  Frown,
  Heart,
  TrendingUp,
  Shield,
  Brain,
  Zap,
  Users,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  Target,
  Lightbulb
} from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const { addMoodEntry, getTodayMood, getAverageMood, moodHistory } = useApp();
  const [selectedMood, setSelectedMood] = useState(null);

  const moodOptions = [
    { value: 5, emoji: '😄', label: 'Sangat Bahagia', color: 'text-green-500' },
    { value: 4, emoji: '😊', label: 'Bahagia', color: 'text-green-400' },
    { value: 3, emoji: '😐', label: 'Biasa Saja', color: 'text-yellow-500' },
    { value: 2, emoji: '😔', label: 'Sedih', color: 'text-orange-500' },
    { value: 1, emoji: '😢', label: 'Sangat Sedih', color: 'text-red-500' },
  ];

  const quickActions = [
    {
      title: 'Tulis Jurnal',
      description: 'Ekspresikan perasaan Anda hari ini',
      icon: BookOpen,
      href: '/journal',
      color: 'from-blue-400 to-blue-600'
    },
    {
      title: 'Relaksasi & Musik',
      description: 'Tenangkan pikiran dengan musik',
      icon: Music,
      href: '/relaxation',
      color: 'from-green-400 to-green-600'
    },
    {
      title: 'Chat dengan AI',
      description: 'Berbagi cerita dengan AI companion',
      icon: MessageCircle,
      href: '/ai-chat',
      color: 'from-purple-400 to-purple-600'
    },
    {
      title: 'Edukasi Mental',
      description: 'Pelajari tentang kesehatan mental',
      icon: GraduationCap,
      href: '/education',
      color: 'from-pink-400 to-pink-600'
    }
  ];

  const handleMoodSubmit = () => {
    if (selectedMood) {
      addMoodEntry(selectedMood);
      setSelectedMood(null);
    }
  };

  const todayMood = getTodayMood();
  const averageMood = getAverageMood();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Soft Background Blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="blob w-96 h-96 bg-emerald-200 top-20 -left-20 animate-float-soft"></div>
        <div className="blob w-80 h-80 bg-sky-200 top-1/3 -right-32 animate-float-soft-reverse"></div>
        <div className="blob w-72 h-72 bg-emerald-300 bottom-32 left-1/4 animate-float-soft-delayed"></div>
        <div className="blob w-64 h-64 bg-sky-300 bottom-1/3 right-1/4 animate-float-soft"></div>
      </div>

      {/* Welcome Section */}
      <section className="px-6 pt-32 pb-12 text-center">
        <div className="max-w-5xl mx-auto space-y-8 slide-up">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight">
            Hai {user?.name}!
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              Bagaimana Kabarmu?
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cerita Jiwa siap menemani perjalanan kesehatan mental Anda hari ini
          </p>
        </div>
      </section>

      <div className="px-6 pb-20 space-y-20">

        {/* About Section */}
        <section className="max-w-6xl mx-auto slide-up">
          <div className="glass-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tentang Kami</h2>
              <p className="text-lg text-gray-600">Mengenal Cerita Jiwa lebih dalam</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Visi Kami</h3>
                <p className="text-gray-700 leading-relaxed">
                  Menjadi platform terdepan dalam kesehatan mental digital di Indonesia, menciptakan masyarakat yang lebih sehat secara mental melalui teknologi AI yang inovatif dan aksesibilitas yang luas.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Misi Kami</h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Memberikan dukungan kesehatan mental yang dapat diakses 24/7</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Mengembangkan teknologi AI yang empatik dan efektif</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Meningkatkan kesadaran kesehatan mental di masyarakat</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Mendukung kolaborasi dengan tenaga profesional kesehatan mental</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Tujuan Kami</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Aman & Terpercaya</h4>
                  <p className="text-gray-600 text-sm">Menyediakan platform yang aman dengan standar privasi tinggi</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-sky-500" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Inovasi Teknologi</h4>
                  <p className="text-gray-600 text-sm">Menggunakan AI terkini untuk dukungan yang personal</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Inklusivitas</h4>
                  <p className="text-gray-600 text-sm">Dapat diakses oleh semua kalangan masyarakat</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mental Health Landscape */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-12 slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Memahami Lanskap Kesehatan Mental di Indonesia</h2>
            <p className="text-lg text-gray-600">Visualisasi data dari berbagai sumber ini menyoroti urgensi dan skala tantangan kesehatan mental yang kita hadapi bersama.</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="glass-card p-6 text-center slide-up">
              <div className="text-3xl font-bold text-red-500 mb-2">19.7%</div>
              <p className="text-gray-600 mb-2">Prevalensi Gangguan Mental</p>
              <p className="text-xs text-gray-500">Data Kemenkes RI 2022</p>
            </div>

            <div className="glass-card p-6 text-center slide-up" style={{animationDelay: '0.1s'}}>
              <div className="text-3xl font-bold text-orange-500 mb-2">1:1000</div>
              <p className="text-gray-600 mb-2">Rasio Psikiater</p>
              <p className="text-xs text-gray-500">vs standar WHO</p>
            </div>

            <div className="glass-card p-6 text-center slide-up" style={{animationDelay: '0.2s'}}>
              <div className="text-3xl font-bold text-blue-500 mb-2">75%</div>
              <p className="text-gray-600 mb-2">Tidak Mencari Bantuan</p>
              <p className="text-xs text-gray-500">Orang dengan gangguan mental</p>
            </div>

            <div className="glass-card p-6 text-center slide-up" style={{animationDelay: '0.3s'}}>
              <div className="text-3xl font-bold text-green-500 mb-2">800+</div>
              <p className="text-gray-600 mb-2">Bunuh Diri per Tahun</p>
              <p className="text-xs text-gray-500">Di kalangan remaja</p>
            </div>
          </div>

          {/* Line Chart */}
          <div className="glass-card p-8 mb-12 slide-up">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tren Kesehatan Mental Indonesia (2018-2022)</h3>
            <div className="relative">
              <svg viewBox="0 0 800 300" className="w-full h-64">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="80" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 80 0 L 0 0 0 30" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Y-axis labels */}
                <text x="20" y="30" className="text-xs fill-gray-500">25%</text>
                <text x="20" y="90" className="text-xs fill-gray-500">20%</text>
                <text x="20" y="150" className="text-xs fill-gray-500">15%</text>
                <text x="20" y="210" className="text-xs fill-gray-500">10%</text>
                <text x="20" y="270" className="text-xs fill-gray-500">5%</text>

                {/* X-axis labels */}
                <text x="120" y="290" className="text-xs fill-gray-500 text-center">2018</text>
                <text x="200" y="290" className="text-xs fill-gray-500 text-center">2019</text>
                <text x="280" y="290" className="text-xs fill-gray-500 text-center">2020</text>
                <text x="360" y="290" className="text-xs fill-gray-500 text-center">2021</text>
                <text x="440" y="290" className="text-xs fill-gray-500 text-center">2022</text>

                {/* Data line */}
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  points="120,240 200,210 280,180 360,150 440,120"
                />

                {/* Data points */}
                <circle cx="120" cy="240" r="4" fill="#10b981"/>
                <circle cx="200" cy="210" r="4" fill="#10b981"/>
                <circle cx="280" cy="180" r="4" fill="#10b981"/>
                <circle cx="360" cy="150" r="4" fill="#10b981"/>
                <circle cx="440" cy="120" r="4" fill="#10b981"/>

                {/* Data labels */}
                <text x="120" y="235" className="text-xs fill-gray-700 font-semibold">12%</text>
                <text x="200" y="205" className="text-xs fill-gray-700 font-semibold">14%</text>
                <text x="280" y="175" className="text-xs fill-gray-700 font-semibold">16%</text>
                <text x="360" y="145" className="text-xs fill-gray-700 font-semibold">18%</text>
                <text x="440" y="115" className="text-xs fill-gray-700 font-semibold">20%</text>
              </svg>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Prevalensi gangguan mental di Indonesia menunjukkan peningkatan yang signifikan dalam 5 tahun terakhir</p>
            </div>
          </div>

          {/* Why Cerita Jiwa */}
          <div className="glass-card p-8 slide-up">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Mengapa Cerita Jiwa Hadir?</h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Dengan keterbatasan akses layanan kesehatan mental profesional, teknologi digital menjadi jembatan penting untuk memberikan dukungan awal dan pencegahan. Cerita Jiwa hadir sebagai solusi inovatif untuk mengatasi kesenjangan ini.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Akses Cepat</h4>
                <p className="text-sm text-gray-600">Dukungan kesehatan mental kapan saja, di mana saja</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">AI Empatik</h4>
                <p className="text-sm text-gray-600">Teknologi yang memahami dan mendukung perasaan Anda</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Tanpa Stigma</h4>
                <p className="text-sm text-gray-600">Lingkungan yang aman dan tanpa penilaian</p>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Services */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-12 slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Layanan Profesional Kami</h2>
            <p className="text-lg text-gray-600">Solusi kesehatan mental yang komprehensif dan terintegrasi</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="feature-card text-center slide-up">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Mood Tracker</h3>
              <p className="text-gray-600 text-sm mb-4">Pantau dan analisis pola emosi Anda dengan akurat</p>
              <a href="/mood-tracker" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm group">
                Lihat Mood Tracker
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="feature-card text-center slide-up" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Journal AI</h3>
              <p className="text-gray-600 text-sm mb-4">Tulis refleksi harian dengan bantuan AI cerdas</p>
              <a href="/journal" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm group">
                Mulai Menulis
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="feature-card text-center slide-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">AI Companion</h3>
              <p className="text-gray-600 text-sm mb-4">Curhat dan dapatkan dukungan 24/7 dari AI</p>
              <a href="/ai-chat" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm group">
                Mulai Percakapan
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="feature-card text-center slide-up" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Edukasi Mental</h3>
              <p className="text-gray-600 text-sm mb-4">Pelajari ilmu kesehatan mental dari ahli</p>
              <a href="/education" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm group">
                Jelajahi Materi
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="glass-card p-8 text-center slide-up">
              <div className="text-4xl font-bold text-emerald-600 mb-2">10K+</div>
              <p className="text-gray-600">Pengguna Aktif</p>
            </div>
            <div className="glass-card p-8 text-center slide-up" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl font-bold text-sky-600 mb-2">50K+</div>
              <p className="text-gray-600">Sesi Dukungan</p>
            </div>
            <div className="glass-card p-8 text-center slide-up" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <p className="text-gray-600">Tingkat Kepuasan</p>
            </div>
            <div className="glass-card p-8 text-center slide-up" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <p className="text-gray-600">Dukungan Online</p>
            </div>
          </div>
        </section>

        {/* Mood Tracker */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 slide-up">
            <div className="flex items-center space-x-2 mb-6">
              <Heart className="w-6 h-6 text-emerald-500" />
              <h2 className="text-2xl font-semibold text-gray-800">Pelacak Suasana Hati</h2>
            </div>
        
        {todayMood ? (
          <div className="text-center space-y-2">
            <div className="text-4xl">
              {moodOptions.find(m => m.value === todayMood.mood)?.emoji}
            </div>
            <p className="text-gray-600">
              Hari ini Anda merasa: {moodOptions.find(m => m.value === todayMood.mood)?.label}
            </p>
            <p className="text-sm text-gray-500">
              Terima kasih sudah berbagi perasaan Anda hari ini
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600 text-center">Bagaimana perasaan Anda hari ini?</p>
            <div className="flex justify-center space-x-4">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    selectedMood === mood.value
                      ? 'bg-primary-100 ring-2 ring-primary-400'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="text-2xl">{mood.emoji}</div>
                  <div className="text-xs text-gray-600 mt-1">{mood.label}</div>
                </button>
              ))}
            </div>
            {selectedMood && (
              <div className="text-center">
                <Button onClick={handleMoodSubmit}>
                  Simpan Suasana Hati
                </Button>
              </div>
            )}
          </div>
        )}
        </div>
      </div>

        {/* Stats */}
        {moodHistory.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-8 text-center slide-up">
                <TrendingUp className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Rata-rata Mood</h3>
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  {moodOptions.find(m => m.value === averageMood)?.emoji || '😐'}
                </div>
                <p className="text-gray-600">
                  {moodOptions.find(m => m.value === averageMood)?.label || 'Biasa Saja'}
                </p>
              </div>

              <div className="glass-card p-8 text-center slide-up" style={{animationDelay: '0.2s'}}>
                <BookOpen className="w-10 h-10 text-sky-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Hari Tracking</h3>
                <div className="text-4xl font-bold text-sky-600 mb-2">{moodHistory.length}</div>
                <p className="text-gray-600">Hari sudah dicatat</p>
              </div>
            </div>
          </div>
        )}





        {/* Quick Actions */}
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-12 slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Akses Cepat Fitur</h2>
            <p className="text-lg text-gray-600">Mulai perjalanan kesehatan mental Anda hari ini</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => (
              <div key={action.title} className="feature-card slide-up p-6" style={{animationDelay: `${index * 0.1}s`}}>
                <a href={action.href} className="block">
                  <div className="flex items-start space-x-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center flex-shrink-0`}>
                      <action.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{action.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{action.description}</p>
                      <div className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm group">
                        Mulai Sekarang
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Motivational Quote */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 text-center slide-up">
            <div className="space-y-4">
              <p className="text-xl md:text-2xl font-medium text-gray-800 italic leading-relaxed">
                "Setiap jiwa pasti punya cerita."
              </p>
              <p className="text-gray-600">- Cerita Jiwa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;