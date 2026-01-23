import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Heart,
  Menu,
  X,
  ChevronDown,
  BarChart3,
  BookOpen,
  MessageCircle,
  Lightbulb,
  Headphones,
  AlertCircle
} from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
  const location = useLocation();

  const features = [
    {
      icon: BarChart3,
      title: "Mood Tracker",
      description: "Pantau suasana hati Anda",
      link: "/mood-tracker"
    },
    {
      icon: BookOpen,
      title: "Journal Mood",
      description: "Catat pikiran dan perasaan",
      link: "/journal"
    },
    {
      icon: MessageCircle,
      title: "Talk Room AI",
      description: "Curhat dengan AI empati",
      link: "/ai-chat"
    },
    {
      icon: AlertCircle,
      title: "Pusat Bantuan",
      description: "Laporkan masalah & chat CS",
      link: "/reports"
    },
    {
      icon: Lightbulb,
      title: "CBT Exercise",
      description: "Latihan terapi kognitif",
      link: "/cbt"
    },
    {
      icon: Headphones,
      title: "Audio Relaksasi",
      description: "Panduan meditasi dan relaksasi",
      link: "/relaxation"
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isFeatureActive = () => {
    return features.some(feature => location.pathname === feature.link);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mx-4 mt-4">
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-300 to-sky-400 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">Cerita Jiwa</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors duration-300 ${
                isActive('/') ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-500'
              }`}
            >
              Beranda
            </Link>

            <a
              href="#about"
              className="text-gray-600 hover:text-emerald-500 font-medium transition-colors duration-300"
            >
              Tentang Kami
            </a>

            {/* Features Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setFeaturesDropdownOpen(true)}
                onMouseLeave={() => setFeaturesDropdownOpen(false)}
                className={`flex items-center space-x-1 font-medium transition-colors duration-300 ${
                  isFeatureActive() ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-500'
                }`}
              >
                <span>Fitur</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {featuresDropdownOpen && (
                <div
                  className="absolute top-full mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 py-4"
                  onMouseEnter={() => setFeaturesDropdownOpen(true)}
                  onMouseLeave={() => setFeaturesDropdownOpen(false)}
                >
                  <div className="px-4 pb-3 border-b border-gray-200/50">
                    <h3 className="font-semibold text-gray-800">Fitur Utama</h3>
                  </div>
                  <div className="px-2 pt-2">
                    {features.map((feature, index) => (
                      <Link
                        key={index}
                        to={feature.link}
                        className={`flex items-start space-x-3 p-3 rounded-xl transition-all duration-200 ${
                          isActive(feature.link)
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'hover:bg-gray-50 text-gray-700 hover:text-emerald-600'
                        }`}
                      >
                        <feature.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium">{feature.title}</div>
                          <div className="text-sm opacity-75">{feature.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/education"
              className={`font-medium transition-colors duration-300 ${
                isActive('/education') ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-500'
              }`}
            >
              Artikel
            </Link>

            <Link
              to="/guest"
              className={`font-medium transition-colors duration-300 ${
                isActive('/guest') ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-500'
              }`}
            >
              Mode Guest
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              <Link
                to="/login"
                className="bg-white text-emerald-600 px-4 py-2 rounded-xl font-semibold border-2 border-emerald-600 hover:bg-emerald-50 transition-all duration-300"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Daftar
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`font-medium transition-colors duration-300 ${
                  isActive('/') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Beranda
              </Link>

              <a
                href="#about"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tentang Kami
              </a>

              {/* Mobile Features Section */}
              <div className="space-y-2">
                <div className="font-semibold text-gray-800 py-2">Fitur Utama</div>
                {features.map((feature, index) => (
                  <Link
                    key={index}
                    to={feature.link}
                    className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                      isActive(feature.link)
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <feature.icon className="w-5 h-5" />
                    <span>{feature.title}</span>
                  </Link>
                ))}
              </div>

              <Link
                to="/education"
                className={`font-medium transition-colors duration-300 ${
                  isActive('/education') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Artikel
              </Link>

              <Link
                to="/guest"
                className={`font-medium transition-colors duration-300 ${
                  isActive('/guest') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Mode Guest
              </Link>

              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Link
                  to="/login"
                  className="bg-white text-emerald-600 px-4 py-2 rounded-xl font-semibold border-2 border-emerald-600 hover:bg-emerald-50 transition-all duration-300 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Daftar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;