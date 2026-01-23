import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Heart, Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

const Login = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (user) {
    const redirectPath = user.role === 'admin' ? '/admin' : 
                        user.role === 'support' ? '/support' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validation
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Simulate loading delay for better UX
    setTimeout(() => {
      const result = login(formData.email, formData.password);
      
      if (!result.success) {
        setErrors({ general: result.message });
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="blob w-96 h-96 bg-emerald-200 top-20 -left-20 animate-float-soft"></div>
        <div className="blob w-80 h-80 bg-sky-200 top-1/3 -right-32 animate-float-soft-reverse"></div>
        <div className="blob w-72 h-72 bg-emerald-300 bottom-32 left-1/4 animate-float-soft-delayed"></div>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="max-w-md text-center space-y-8 fade-in">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-300 to-sky-400 rounded-2xl flex items-center justify-center shadow-xl">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-800">Selamat Datang di Cerita Jiwa</h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Platform kesehatan mental yang aman dan terpercaya untuk mendampingi perjalanan kesejahteraan jiwa Anda.
              </p>
            </div>
            <div className="glass-card p-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-3">Mengapa Cerita Jiwa?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>100% Anonim & Aman</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>AI Canggih untuk Analisis Emosi</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Gratis Tanpa Biaya Tersembunyi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md space-y-8 slide-up">
            {/* Back to Home */}
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-600 hover:text-emerald-500 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Link>

            {/* Form Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-800">Masuk ke Akun</h2>
              <p className="text-gray-600">Lanjutkan perjalanan kesehatan mental Anda</p>
            </div>

            {/* Login Form */}
            <div className="glass-card p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 font-medium">Login Gagal</p>
                      <p className="text-red-600 text-sm">{errors.general}</p>
                    </div>
                  </div>
                )}

                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="nama@email.com"
                  className="transition-all duration-300"
                />

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="Masukkan password Anda"
                    className="transition-all duration-300"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-11 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-200" />
                    <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                  </label>
                  <button type="button" className="text-sm text-emerald-500 hover:text-emerald-600 transition-colors">
                    Lupa password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Memproses...
                    </>
                  ) : (
                    'Masuk'
                  )}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-gray-600">
                  Belum punya akun?{' '}
                  <Link to="/register" className="text-emerald-500 hover:text-emerald-600 font-medium transition-colors">
                    Daftar sekarang
                  </Link>
                </p>
              </div>
            </div>

            {/* Demo Accounts */}
            <div className="glass-card p-6">
              <h3 className="font-semibold text-gray-800 mb-4 text-center">Akun Demo untuk Testing</h3>
              <div className="space-y-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-emerald-800">Admin</p>
                  <p className="text-xs text-emerald-600">admin@ceritajiwa.com / admin123</p>
                </div>
                <div className="bg-sky-50 border border-sky-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-sky-800">Support</p>
                  <p className="text-xs text-sky-600">support@ceritajiwa.com / support123</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-purple-800">User</p>
                  <p className="text-xs text-purple-600">user@example.com / user123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;