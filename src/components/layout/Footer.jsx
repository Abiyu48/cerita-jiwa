import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden">
      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-25%); }
        }
        .animate-wave {
          animation: wave 20s linear infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Wave Animation Background */}
      <div className="absolute inset-0 -z-10">
        <svg className="absolute bottom-0 w-full h-32 animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C300,80 600,80 900,40 C1200,0 1500,60 1800,40 L1800,120 L0,120 Z"
                fill="url(#gradient1)" opacity="0.3"/>
        </svg>
        <svg className="absolute bottom-0 w-full h-32 animate-wave" style={{animationDelay: '-5s'}} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,20 C300,60 600,20 900,60 C1200,20 1500,80 1800,60 L1800,120 L0,120 Z"
                fill="url(#gradient2)" opacity="0.3"/>
        </svg>
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </div>

      {/* Main Footer Content */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
          {/* Top Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-sky-500 rounded-2xl flex items-center justify-center shadow-lg animate-float-slow">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                  Cerita Jiwa
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                Platform kesehatan mental berbasis AI yang membantu Anda mengelola emosi,
                meningkatkan kesejahteraan, dan menemukan keseimbangan hidup.
              </p>

              {/* Social Media */}
              <div className="flex items-center space-x-4">
                <a href="#" className="group w-10 h-10 bg-white/10 hover:bg-gradient-to-br hover:from-emerald-400 hover:to-sky-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="group w-10 h-10 bg-white/10 hover:bg-gradient-to-br hover:from-emerald-400 hover:to-sky-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="group w-10 h-10 bg-white/10 hover:bg-gradient-to-br hover:from-emerald-400 hover:to-sky-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Twitter className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="group w-10 h-10 bg-white/10 hover:bg-gradient-to-br hover:from-emerald-400 hover:to-sky-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Navigasi Cepat</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Beranda', href: '#home' },
                  { label: 'Tentang Kami', href: '#about' },
                  { label: 'Fitur', href: '#fitur' },
                  { label: 'Artikel', href: '#insight' },
                  { label: 'Mode Guest', href: '/guest' }
                ].map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 flex items-center group">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Fitur Utama</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Mood Tracker', href: '/mood-tracker' },
                  { label: 'Journal Mood', href: '/journal' },
                  { label: 'Talk Room AI', href: '/talk-room' },
                  { label: 'CBT Exercise', href: '/guest' },
                  { label: 'Audio Relaksasi', href: '/guest' }
                ].map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center group">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-sky-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © 2026 Cerita Jiwa. Dibuat dengan{' '}
                <Heart className="w-4 h-4 inline text-red-500 animate-pulse" />{' '}
                untuk kesehatan mental Indonesia.
              </p>

              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Kebijakan Privasi
                </a>
                <span className="text-gray-600">•</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Syarat & Ketentuan
                </a>
                <span className="text-gray-600">•</span>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-emerald-400 to-sky-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-110 group z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 text-white group-hover:animate-bounce" />
        </button>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
