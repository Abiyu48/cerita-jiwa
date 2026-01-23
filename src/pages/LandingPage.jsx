import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {
  Heart,
  Shield,
  Brain,
  Zap,
  BookOpen,
  MessageCircle,
  BarChart3,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Menu,
  X,
  Star,
  Lock,
  DollarSign
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

const LandingPage = () => {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: BarChart3,
      title: "Mood Tracker",
      description: "Pantau perubahan suasana hatimu setiap hari",
      link: "/mood-tracker"
    },
    {
      icon: BookOpen,
      title: "Journal Mood",
      description: "Tulis dan analisis perasaanmu dengan AI",
      link: "/journal"
    },
    {
      icon: MessageCircle,
      title: "Talk Room",
      description: "Curhat dengan AI yang siap mendengarkan",
      link: "/talk-room"
    }
  ];

  const articles = [
    {
      category: "Akademik",
      title: "Mengatasi Burnout Akademik: Tips dan Strategi",
      excerpt: "Pelajari cara mengenali tanda-tanda burnout dan strategi efektif untuk mengatasinya agar tetap produktif.",
      categoryColor: "bg-blue-100 text-blue-700"
    },
    {
      category: "Teknik",
      title: "Pentingnya Mindfulness dalam Rutinitas Harian",
      excerpt: "Integrasikan praktik mindfulness ke dalam keseharianmu untuk meningkatkan fokus dan mengurangi stres.",
      categoryColor: "bg-green-100 text-green-700"
    },
    {
      category: "Pengembangan Diri",
      title: "Membangun Resiliensi Mental di Era Digital",
      excerpt: "Kembangkan ketahanan mental untuk menghadapi tantangan di dunia digital yang serba cepat dan penuh tekanan.",
      categoryColor: "bg-purple-100 text-purple-700"
    }
  ];

  const faqs = [
    {
      question: "Apakah Cerita Jiwa benar-benar gratis?",
      answer: "Ya, Cerita Jiwa sepenuhnya gratis untuk fitur Mood Tracker, Journal Mood, dan Talk Room. Kami berkomitmen untuk menyediakan akses kesehatan mental yang bebas hambatan bagi pelajar di Indonesia."
    },
    {
      question: "Bagaimana cara kerja Talk Room dengan AI?",
      answer: "Talk Room menggunakan teknologi AI canggih yang dilatih khusus untuk memberikan respons yang empatik dan mendukung. AI kami dapat memahami konteks emosional dan memberikan saran yang relevan."
    },
    {
      question: "Apakah data jurnal dan mood saya aman?",
      answer: "Keamanan data Anda adalah prioritas utama kami. Semua data dienkripsi end-to-end dan disimpan dengan standar keamanan tinggi. Kami tidak akan pernah membagikan data pribadi Anda."
    },
    {
      question: "Apa perbedaan antara Mood Tracker dan Journal Mood?",
      answer: "Mood Tracker fokus pada pencatatan suasana hati harian dengan visualisasi grafik, sedangkan Journal Mood memungkinkan Anda menulis refleksi mendalam yang dianalisis AI untuk memberikan insight personal."
    }
  ];

  const testimonials = [
    {
      name: "Rangga Awan",
      role: "Mahasiswa",
      text: "Mood Tracker sangat membantu saya memahami pola emosi, dan Talk Room terasa seperti memiliki teman yang selalu ada.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Darren Aurelyo",
      role: "Pelajar",
      text: "Desainnya menenangkan dan fitur AI Journal-nya memberikan wawasan yang sangat mendalam tentang kecemasan saya.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Wafa Arieb",
      role: "Pelajar",
      text: "Sebagai platform gratis, kualitasnya luar biasa. Rasanya seperti mendapat dukungan mental tanpa perlu khawatir biaya.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style>{`
        @keyframes float-soft {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        @keyframes float-soft-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-30px, 30px) rotate(-5deg); }
          66% { transform: translate(20px, -20px) rotate(5deg); }
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.4;
        }
        .animate-float-soft {
          animation: float-soft 20s ease-in-out infinite;
        }
        .animate-float-soft-reverse {
          animation: float-soft-reverse 25s ease-in-out infinite;
        }
        .animate-float-soft-delayed {
          animation: float-soft 22s ease-in-out infinite;
          animation-delay: -5s;
        }
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .btn-primary {
          background: linear-gradient(135deg, #10b981 0%, #0ea5e9 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
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

      {/* Soft Background Blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="blob w-96 h-96 bg-emerald-200 top-20 -left-20 animate-float-soft"></div>
        <div className="blob w-80 h-80 bg-sky-200 top-1/3 -right-32 animate-float-soft-reverse"></div>
        <div className="blob w-72 h-72 bg-emerald-300 bottom-32 left-1/4 animate-float-soft-delayed"></div>
        <div className="blob w-64 h-64 bg-sky-300 bottom-1/3 right-1/4 animate-float-soft"></div>
      </div>

      {/* Header */}
      <Card as="header" className="fixed top-0 left-0 right-0 z-50 mx-4 mt-4 px-6 py-4 fade-in">
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

      {/* Hero Section */}
      <section id="home" className="px-6 pt-32 pb-20 text-center min-h-screen flex items-center">
        <div className="max-w-5xl mx-auto space-y-8 slide-up">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight">
            Bagaimana Kabarmu?
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              Cerita Jiwa
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Platform kesehatan mental berbasis AI untuk membantumu mengelola emosi dan meningkatkan kesejahteraan hidup
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/login" className="btn-primary group">
              Mulai Sekarang
              <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/guest" className="btn-secondary">
              Coba Mode Guest
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="about" className="px-6 py-20">
        <div className="max-w-5xl mx-auto slide-up">
          <Card className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Filosofi Kami</h2>
            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              "Kesehatan mental adalah perjalanan, bukan tujuan. Cerita Jiwa berkomitmen menjadi pendamping digitalmu yang andal, aman, dan tanpa penghakiman. Kami percaya setiap individu berhak mendapatkan dukungan terbaik untuk mencapai kesejahteraan jiwa."
            </blockquote>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">100% Anonim & Aman</h3>
                <p className="text-gray-600 text-sm">Data pribadi terlindungi dengan enkripsi tingkat militer</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-sky-500" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Teknologi AI Canggih</h3>
                <p className="text-gray-600 text-sm">AI yang memahami emosi dan memberikan insight personal</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Bebas Biaya</h3>
                <p className="text-gray-600 text-sm">Akses penuh ke semua fitur tanpa biaya tersembunyi</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Mengapa Kami Berbeda?</h2>
            <p className="text-xl text-gray-600">Fitur-fitur yang dirancang khusus untuk kesehatan mentalmu</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center slide-up p-6" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <a href={feature.link} className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group">
                  Lihat Fitur
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="insight" className="px-6 py-20 bg-gradient-to-r from-emerald-50/50 to-sky-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-16 slide-up">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Artikel</h2>
              <p className="text-xl text-gray-600">Wawasan dan tips untuk kesehatan mental yang lebih baik</p>
            </div>
            <a href="/articles" className="hidden md:inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group">
              Lihat Semua Artikel
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card key={index} className="slide-up p-6" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${article.categoryColor}`}>
                    {article.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">{article.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{article.excerpt}</p>
                <a href="#" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group">
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-xl text-gray-600">Jawaban untuk pertanyaan yang mungkin ada di benakmu</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/10 transition-colors rounded-3xl"
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {activeAccordion === index ? 
                      <ChevronUp className="w-5 h-5 text-emerald-600" /> : 
                      <ChevronDown className="w-5 h-5 text-emerald-600" />
                    }
                  </div>
                </button>
                {activeAccordion === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-emerald-50/30 to-sky-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Dengarkan Kata Mereka</h2>
            <p className="text-xl text-gray-600">Testimoni dari pengguna yang telah merasakan manfaatnya</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 text-center slide-up" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center justify-center space-x-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;