import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Camera, User, Heart } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
    avatar: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState('');

  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);
        setPreviewAvatar(parsedProfile.avatar);
      } else {
        setProfile(prev => ({
          ...prev,
          name: user.name,
          email: user.email,
          username: user.name.toLowerCase().replace(/\s+/g, '_')
        }));
      }
    }
  }, [user]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        setPreviewAvatar(base64);
        setProfile(prev => ({ ...prev, avatar: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    if (user) {
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));
      setIsEditing(false);
      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent('profileUpdated', { detail: profile }));
    }
  };

  const cancelEdit = () => {
    // Reset to saved profile
    const savedProfile = localStorage.getItem(`profile_${user.id}`);
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      setPreviewAvatar(parsedProfile.avatar);
    }
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-emerald-700">Profil Anda</h1>
        <p className="text-sky-600 italic">Profilmu adalah bagian dari perjalanan sehatmu</p>
      </div>

      {/* Avatar Section */}
      <Card className="p-6 text-center">
        <div className="relative inline-block">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-emerald-200 bg-gradient-to-br from-emerald-50 to-sky-50 flex items-center justify-center transition-all duration-300 hover:border-emerald-300">
            {previewAvatar ? (
              <img
                src={previewAvatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-16 h-16 text-emerald-400" />
            )}
          </div>
          {isEditing && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full transition-colors duration-200 shadow-lg"
            >
              <Camera className="w-4 h-4" />
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <p className="text-sm text-gray-500 mt-4">
          {isEditing ? 'Klik ikon kamera untuk mengubah foto profil' : 'Foto profil Anda'}
        </p>
      </Card>

      {/* Profile Form */}
      <Card className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-emerald-700 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Informasi Pribadi
          </h2>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Edit Profil
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={cancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Batal
              </Button>
              <Button
                onClick={saveProfile}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Simpan
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nama Lengkap"
            value={profile.name}
            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
            disabled={!isEditing}
            className="transition-all duration-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <Input
            label="Username"
            value={profile.username}
            onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
            disabled={!isEditing}
            className="transition-all duration-200 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <Input
          label="Email"
          type="email"
          value={profile.email}
          onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
          disabled={!isEditing}
          className="transition-all duration-200 focus:ring-emerald-500 focus:border-emerald-500"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio Singkat / Cerita Diri
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
            rows="4"
            placeholder="Ceritakan sedikit tentang diri Anda..."
            value={profile.bio}
            onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
            disabled={!isEditing}
          />
        </div>
      </Card>

      {/* Success Message */}
      {!isEditing && (
        <Card className="p-4 bg-emerald-50 border-emerald-200">
          <p className="text-emerald-700 text-center flex items-center justify-center gap-2">
            <Heart className="w-4 h-4" />
            Profil Anda telah disimpan dengan aman
          </p>
        </Card>
      )}
    </div>
  );
};

export default Profile;
