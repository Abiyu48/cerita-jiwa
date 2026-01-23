import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  Flower2,
  Lock,
  BookOpen,
  Headphones,
  Wind,
  User,
  TreePine,
  Music,
  Lightbulb,
  Plus,
  X,
  Check,
  Play,
  Pause
} from 'lucide-react';

const Insight = () => {
  const { gratitudeSeeds, worryVault, addGratitudeSeed, addWorry } = useApp();
  const [gratitudeText, setGratitudeText] = useState('');
  const [worryText, setWorryText] = useState('');
  const [worryCategory, setWorryCategory] = useState('');
  const [cbtStep, setCbtStep] = useState(1);
  const [cbtData, setCbtData] = useState({
    situation: '',
    thoughts: '',
    evidence: '',
    alternative: ''
  });
  const [cbtCompleted, setCbtCompleted] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(null);

  const handleAddGratitude = () => {
    if (gratitudeText.trim()) {
      addGratitudeSeed(gratitudeText);
      setGratitudeText('');
    }
  };

  const handleAddWorry = () => {
    if (worryText.trim() && worryCategory) {
      addWorry(worryText, worryCategory);
      setWorryText('');
      setWorryCategory('');
    }
  };

  const audioExercises = [
    {
      id: 'breathing',
      title: 'Pernapasan 4-7-8',
      duration: '3 menit',
      icon: Wind,
      color: 'from-blue-400 to-blue-600',
      borderColor: 'border-blue-300'
    },
    {
      id: 'bodyscan',
      title: 'Body Scan Relaxation',
      duration: '8 menit',
      icon: User,
      color: 'from-green-400 to-green-600',
      borderColor: 'border-green-300'
    },
    {
      id: 'grounding',
      title: 'Grounding 5-4-3-2-1',
      duration: '2 menit',
      icon: TreePine,
      color: 'from-purple-400 to-purple-600',
      borderColor: 'border-purple-300'
    },
    {
      id: 'whitenoise',
      title: 'White Noise untuk Fokus',
      duration: '5 menit',
      icon: Music,
      color: 'from-pink-400 to-pink-600',
      borderColor: 'border-pink-300'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Soft Background Blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="blob w-96 h-96 bg-indigo-200 top-20 -left-20 animate-float-soft"></div>
        <div className="blob w-80 h-80 bg-purple-200 top-1/3 -right-32 animate-float-soft-reverse"></div>
        <div className="blob w-72 h-72 bg-pink-300 bottom-32 left-1/4 animate-float-soft-delayed"></div>
        <div className="blob w-64 h-64 bg-blue-300 bottom-1/3 right-1/4 animate-float-soft"></div>
      </div>

      <div className="px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Header */}
          <div className="text-center slide-up">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Lightbulb className="w-8 h-8 text-indigo-500" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Insight</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Latihan interaktif untuk mengembangkan kesadaran diri dan mengelola emosi dengan lebih baik.
            </p>
          </div>

          {/* The Gratitude Garden */}
          <div className="slide-up">
            <Card className="p-8 border-2 border-green-300 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
                  <Flower2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">The Gratitude Garden</h2>
                  <p className="text-green-600 font-semibold">{gratitudeSeeds.length} Benih Ditanam 🌳</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Tumbuhkan taman syukurmu! Setiap kali kamu menuliskan hal yang kamu syukuri, sebuah bunga indah akan mekar di tamanmu. Maksimal satu benih per hari.
              </p>

              {/* Garden Visualization */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl mb-6 border border-green-200">
                <div className="text-center">
                  <div className="text-6xl mb-4">☀️</div>
                  {gratitudeSeeds.length === 0 ? (
                    <div>
                      <p className="text-gray-600 mb-4">Tamanmu masih kosong 🌱</p>
                      <p className="text-sm text-gray-500">Mulai tanam benih syukur pertamamu!</p>
                    </div>
                  ) : (
                    <div className="flex justify-center space-x-4">
                      {gratitudeSeeds.slice(0, 5).map((seed, index) => (
                        <div key={index} className="text-4xl animate-bounce" style={{animationDelay: `${index * 0.2}s`}}>
                          🌸
                        </div>
                      ))}
                      {gratitudeSeeds.length > 5 && <span className="text-2xl">...</span>}
                    </div>
                  )}
                </div>
              </div>

              {/* Add Gratitude Input */}
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={gratitudeText}
                  onChange={(e) => setGratitudeText(e.target.value)}
                  placeholder="Apa yang membuatmu bersyukur hari ini?"
                  className="flex-1 px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Button
                  onClick={handleAddGratitude}
                  disabled={!gratitudeText.trim()}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Worry Vault */}
          <div className="slide-up">
            <Card className="p-8 border-2 border-orange-300 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Worry Vault</h2>
                  <p className="text-orange-600 font-semibold">{worryVault.length} Kekhawatiran Terkunci</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Tulis kekhawatiranmu dan kunci di brankas mental. Pisahkan mana yang bisa kamu kontrol dan mana yang harus kamu lepaskan.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apa yang membuatmu khawatir? Tuliskan...
                  </label>
                  <textarea
                    value={worryText}
                    onChange={(e) => setWorryText(e.target.value)}
                    placeholder="Tuliskan kekhawatiranmu di sini..."
                    className="w-full h-24 p-4 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setWorryCategory('controllable')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      worryCategory === 'controllable'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-green-300'
                    }`}
                  >
                    <div className="text-center">
                      <Check className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <div className="font-semibold">Bisa Dikontrol</div>
                      <div className="text-sm">Aku bisa melakukan sesuatu tentang ini</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setWorryCategory('uncontrollable')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      worryCategory === 'uncontrollable'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-red-300'
                    }`}
                  >
                    <div className="text-center">
                      <X className="w-8 h-8 mx-auto mb-2 text-red-600" />
                      <div className="font-semibold">Tidak Bisa Dikontrol</div>
                      <div className="text-sm">Ini di luar kuasaku</div>
                    </div>
                  </button>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleAddWorry}
                    disabled={!worryText.trim() || !worryCategory}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2"
                  >
                    <Lock className="w-5 h-5" />
                    <span>Kunci Kekhawatiran</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setWorryText('');
                      setWorryCategory('');
                    }}
                    className="px-6 py-3 rounded-xl"
                  >
                    Batal
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Buku Latihan CBT */}
          <div className="slide-up">
            <Card className="p-8 border-2 border-indigo-300 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Buku Latihan CBT</h2>
                  <p className="text-indigo-600 font-semibold">Cognitive Behavioral Therapy</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Latihan singkat untuk menganalisis dan mengubah pola pikirmu dengan metode Cognitive Behavioral Therapy (CBT).
              </p>

              {!cbtCompleted ? (
                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            step <= cbtStep
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Langkah {cbtStep} dari 4</span>
                  </div>

                  {/* Step Content */}
                  {cbtStep === 1 && (
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-800 mb-4">Langkah 1: Situasi</h3>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apa situasi yang membuatmu merasa tertekan?
                      </label>
                      <textarea
                        value={cbtData.situation}
                        onChange={(e) => setCbtData({...cbtData, situation: e.target.value})}
                        placeholder="Jelaskan situasi yang membuatmu merasa tertekan..."
                        className="w-full h-24 p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      />
                      <div className="mt-4 text-sm text-gray-600">
                        💡 Tip: Mulai dengan fakta objektif, bukan interpretasi emosional.
                      </div>
                    </div>
                  )}

                  {cbtStep === 2 && (
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-800 mb-4">Langkah 2: Pikiran</h3>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apa pikiran otomatis yang muncul di pikiranmu?
                      </label>
                      <textarea
                        value={cbtData.thoughts}
                        onChange={(e) => setCbtData({...cbtData, thoughts: e.target.value})}
                        placeholder="Tuliskan pikiran-pikiran yang muncul..."
                        className="w-full h-24 p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      />
                      <div className="mt-4 text-sm text-gray-600">
                        💡 Tip: Pikiran apa yang pertama kali muncul saat situasi terjadi?
                      </div>
                    </div>
                  )}

                  {cbtStep === 3 && (
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-800 mb-4">Langkah 3: Bukti</h3>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apa bukti yang mendukung dan menentang pikiran ini?
                      </label>
                      <textarea
                        value={cbtData.evidence}
                        onChange={(e) => setCbtData({...cbtData, evidence: e.target.value})}
                        placeholder="Bukti yang mendukung: ...&#10;Bukti yang menentang: ..."
                        className="w-full h-32 p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      />
                      <div className="mt-4 text-sm text-gray-600">
                        💡 Tip: Cari bukti objektif, bukan asumsi atau perasaan.
                      </div>
                    </div>
                  )}

                  {cbtStep === 4 && (
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-800 mb-4">Langkah 4: Alternatif dan Analisis</h3>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apa perspektif alternatif yang lebih seimbang?
                      </label>
                      <textarea
                        value={cbtData.alternative}
                        onChange={(e) => setCbtData({...cbtData, alternative: e.target.value})}
                        placeholder="Tuliskan pandangan alternatif yang lebih realistis..."
                        className="w-full h-32 p-4 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      />
                      <div className="mt-4 text-sm text-gray-600">
                        💡 Tip: Bagaimana orang lain yang bijak akan melihat situasi ini?
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setCbtStep(Math.max(1, cbtStep - 1))}
                      disabled={cbtStep === 1}
                      className="px-6 py-2"
                    >
                      Sebelumnya
                    </Button>
                    <Button
                      onClick={() => {
                        if (cbtStep < 4) {
                          setCbtStep(cbtStep + 1);
                        } else {
                          setCbtCompleted(true);
                        }
                      }}
                      disabled={
                        (cbtStep === 1 && !cbtData.situation.trim()) ||
                        (cbtStep === 2 && !cbtData.thoughts.trim()) ||
                        (cbtStep === 3 && !cbtData.evidence.trim()) ||
                        (cbtStep === 4 && !cbtData.alternative.trim())
                      }
                      className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-2"
                    >
                      {cbtStep === 4 ? 'Selesai' : 'Selanjutnya'}
                    </Button>
                  </div>
                </div>
              ) : (
                /* CBT Results */
                <div className="space-y-6">
                  <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
                    <h3 className="text-xl font-semibold text-indigo-800 mb-6">Rangkuman & Analisis CBT</h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-indigo-700 mb-2">Situasi:</h4>
                        <p className="text-gray-700 bg-white p-3 rounded-lg border">{cbtData.situation}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-indigo-700 mb-2">Pikiran Otomatis:</h4>
                        <p className="text-gray-700 bg-white p-3 rounded-lg border">{cbtData.thoughts}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-indigo-700 mb-2">Perspektif Alternatif:</h4>
                        <p className="text-gray-700 bg-white p-3 rounded-lg border">{cbtData.alternative || 'Belum diisi'}</p>
                      </div>
                    </div>
                  </div>

                  {/* AI Analysis */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200">
                    <div className="flex items-center space-x-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-indigo-600" />
                      <h4 className="font-semibold text-indigo-800">Analisis AI</h4>
                    </div>
                    <p className="text-indigo-700 leading-relaxed">
                      🧠 Sangat baik Anda telah mengidentifikasi "{cbtData.thoughts}" sebagai pikiran otomatis di situasi tersebut.
                      {cbtData.alternative ? ' Upaya Anda untuk mencari perspektif alternatif sangat berharga.' : ' Upaya Anda untuk mencari bukti dan perspektif alternatif, meskipun belum terisi, adalah langkah krusial dalam proses CBT.'}
                      Ingatlah, tujuan kita adalah menemukan pandangan yang lebih realistis dan seimbang, bahkan jika pada awalnya terasa sulit. Setiap usaha untuk menggali perspektif baru sangat berharga dalam membangun ketahanan emosional Anda.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <Button
                      onClick={() => {
                        setCbtStep(1);
                        setCbtData({ situation: '', thoughts: '', evidence: '', alternative: '' });
                        setCbtCompleted(false);
                      }}
                      variant="outline"
                      className="flex-1 px-6 py-3"
                    >
                      Mulai Ulang
                    </Button>
                    <Button
                      onClick={() => {
                        // Save to journal
                        const journalContent = `Latihan CBT:\n\nSituasi: ${cbtData.situation}\nPikiran: ${cbtData.thoughts}\nBukti: ${cbtData.evidence}\nAlternatif: ${cbtData.alternative}`;
                        // This would integrate with the journal context
                        alert('Fitur simpan ke journal akan segera hadir!');
                      }}
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-3"
                    >
                      Simpan ke Journal
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Panduan Audio Fokus */}
          <div className="slide-up">
            <Card className="p-8 border-2 border-teal-300 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Panduan Audio Fokus</h2>
                  <p className="text-teal-600 font-semibold">Latihan audio untuk menenangkan pikiran</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Latihan audio singkat untuk menenangkan pikiran dan tubuhmu. Gunakan headphone untuk pengalaman terbaik.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {audioExercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className={`p-6 rounded-2xl border-2 ${exercise.borderColor} bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-300 cursor-pointer`}
                    onClick={() => setPlayingAudio(playingAudio === exercise.id ? null : exercise.id)}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${exercise.color} rounded-xl flex items-center justify-center`}>
                        <exercise.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{exercise.title}</h3>
                        <p className="text-sm text-gray-600">{exercise.duration}</p>
                      </div>
                      <Button
                        size="sm"
                        className={`rounded-full p-2 ${playingAudio === exercise.id ? 'bg-red-500 hover:bg-red-600' : 'bg-teal-500 hover:bg-teal-600'}`}
                      >
                        {playingAudio === exercise.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>

                    {playingAudio === exercise.id && (
                      <div className="mt-4">
                        <div className="bg-gray-200 rounded-full h-2 mb-2">
                          <div className="bg-teal-500 h-2 rounded-full w-1/3 animate-pulse"></div>
                        </div>
                        <p className="text-sm text-gray-600">Memainkan audio...</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-teal-50 rounded-xl border border-teal-200">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-teal-600 mt-0.5" />
                  <p className="text-teal-700 text-sm">
                    <span className="font-semibold">Tips:</span> Cari tempat tenang dan berikan dirimu waktu tanpa gangguan.
                  </p>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Insight;
