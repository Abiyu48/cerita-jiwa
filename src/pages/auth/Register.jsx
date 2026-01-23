import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Heart, Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle, Check, X } from 'lucide-react';

const Register = () => {
  const { user, register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?\":{}|<>]/.test(password)
    };
    
    strength = Object.values(checks).filter(Boolean).length;
    return { strength, checks };
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nama minimal 2 karakter';
    }
    
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
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password tidak cocok';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Simulate loading delay for better UX
    setTimeout(() => {
      const result = register(formData.name.trim(), formData.email, formData.password);
      
      if (!result.success) {
        setErrors({ general: result.message });
      }
      
      setLoading(false);
    }, 1500);
  };

  const passwordStrength = getPasswordStrength(formData.password);

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
              <h1 className="text-4xl font-bold text-gray-800">Mulai Perjalanan Anda</h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Bergabunglah dengan ribuan pengguna yang telah merasakan manfaat platform kesehatan mental kami.
              </p>
            </div>
            <div className="glass-card p-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-3">Yang Akan Anda Dapatkan:</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Mood Tracker untuk memantau perkembangan emosi harian</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Journal AI yang memberikan insight mendalam</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>Talk Room dengan AI yang siap mendengarkan 24/7</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
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
              <h2 className="text-3xl font-bold text-gray-800">Buat Akun Baru</h2>
              <p className="text-gray-600">Daftar gratis dan mulai jaga kesehatan mental Anda</p>
            </div>

            {/* Register Form */}
            <div className="glass-card p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 font-medium">Pendaftaran Gagal</p>
                      <p className="text-red-600 text-sm">{errors.general}</p>
                    </div>
                  </div>
                )}

                <Input
                  label="Nama Lengkap"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Masukkan nama lengkap Anda"
                  className="transition-all duration-300"
                />

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

                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      error={errors.password}
                      placeholder="Minimal 6 karakter"
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
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                              level <= passwordStrength.strength
                                ? passwordStrength.strength <= 2
                                  ? 'bg-red-400'
                                  : passwordStrength.strength <= 3
                                  ? 'bg-yellow-400'
                                  : 'bg-emerald-400'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className={`flex items-center space-x-1 ${passwordStrength.checks.length ? 'text-emerald-600' : 'text-gray-400'}`}>
                          {passwordStrength.checks.length ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          <span>Min 8 karakter</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${passwordStrength.checks.number ? 'text-emerald-600' : 'text-gray-400'}`}>
                          {passwordStrength.checks.number ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          <span>Angka</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <Input
                    label="Konfirmasi Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    placeholder="Ulangi password Anda"
                    className="transition-all duration-300"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-11 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    required
                    className="mt-1 rounded border-gray-300 text-emerald-500 focus:ring-emerald-200" 
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    Saya setuju dengan{' '}
                    <button type="button" className="text-emerald-500 hover:text-emerald-600 underline">
                      Syarat & Ketentuan
                    </button>{' '}
                    dan{' '}
                    <button type="button" className="text-emerald-500 hover:text-emerald-600 underline">
                      Kebijakan Privasi
                    </button>
                  </span>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Membuat Akun...
                    </>
                  ) : (
                    'Daftar Sekarang'
                  )}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-gray-600">
                  Sudah punya akun?{' '}
                  <Link to="/login" className="text-emerald-500 hover:text-emerald-600 font-medium transition-colors">
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;