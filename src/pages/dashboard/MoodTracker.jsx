import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  Calendar,
  TrendingUp,
  Heart,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Smile,
  Meh,
  Frown,
  Lightbulb
} from 'lucide-react';

const MoodTracker = () => {
  const { moodHistory, getAverageMood, journalEntries } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('7hari');

  const moodOptions = [
    { value: 5, emoji: '😄', label: 'Sangat Bahagia', color: 'text-green-500' },
    { value: 4, emoji: '😊', label: 'Bahagia', color: 'text-green-400' },
    { value: 3, emoji: '😐', label: 'Biasa Saja', color: 'text-yellow-500' },
    { value: 2, emoji: '😔', label: 'Sedih', color: 'text-orange-500' },
    { value: 1, emoji: '😢', label: 'Sangat Sedih', color: 'text-red-500' },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const moodEntry = moodHistory.find(entry =>
        new Date(entry.date).toDateString() === date.toDateString()
      );
      days.push({
        day,
        date,
        mood: moodEntry ? moodEntry.mood : null,
        note: moodEntry ? moodEntry.note : null
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  };

  const getMoodStats = () => {
    const totalEntries = moodHistory.length;
    const averageMood = getAverageMood();
    const positiveDays = moodHistory.filter(entry => entry.mood >= 4).length;
    const negativeDays = moodHistory.filter(entry => entry.mood <= 2).length;

    return {
      totalEntries,
      averageMood,
      positiveDays,
      negativeDays,
      positivePercentage: totalEntries > 0 ? Math.round((positiveDays / totalEntries) * 100) : 0,
      negativePercentage: totalEntries > 0 ? Math.round((negativeDays / totalEntries) * 100) : 0
    };
  };

  const stats = getMoodStats();
  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Soft Background Blobs */}
      <div className="fixed inset-0 -z-10">
        <div className="blob w-96 h-96 bg-emerald-200 top-20 -left-20 animate-float-soft"></div>
        <div className="blob w-80 h-80 bg-sky-200 top-1/3 -right-32 animate-float-soft-reverse"></div>
        <div className="blob w-72 h-72 bg-emerald-300 bottom-32 left-1/4 animate-float-soft-delayed"></div>
        <div className="blob w-64 h-64 bg-sky-300 bottom-1/3 right-1/4 animate-float-soft"></div>
      </div>

      <div className="px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12 slide-up">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Heart className="w-8 h-8 text-emerald-500" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Mood Tracker</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pantau perjalanan emosi Anda dan lihat pola yang muncul dari waktu ke waktu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

            {/* Calendar Section */}
            <div className="space-y-6">
              <Card className="p-6 slide-up border-2 border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Kalender Mood</h2>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-emerald-50 flex-shrink-0"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-lg font-semibold text-gray-800 text-center flex-1 min-w-0">
                      {formatMonthYear(currentDate)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth(1)}
                      className="p-2 hover:bg-emerald-50 flex-shrink-0"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
                    <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {days.map((dayData, index) => (
                    <div
                      key={index}
                      className={`aspect-square flex items-center justify-center text-xs rounded-lg border transition-all duration-200 hover:scale-105 ${
                        dayData
                          ? dayData.mood
                            ? `bg-${moodOptions.find(m => m.value === dayData.mood)?.color.split('-')[1]}-50 border-${moodOptions.find(m => m.value === dayData.mood)?.color.split('-')[1]}-200 hover:bg-${moodOptions.find(m => m.value === dayData.mood)?.color.split('-')[1]}-100`
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          : 'border-transparent'
                      }`}
                    >
                      {dayData && (
                        <div className="text-center">
                          <div className="font-semibold text-xs">{dayData.day}</div>
                          {dayData.mood && (
                            <div className="text-sm mt-1">
                              {moodOptions.find(m => m.value === dayData.mood)?.emoji}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-emerald-100">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Legenda:</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {moodOptions.map(mood => (
                      <div key={mood.value} className="flex items-center space-x-2 bg-gray-50 px-2 sm:px-3 py-1 rounded-full">
                        <span className="text-sm sm:text-lg">{mood.emoji}</span>
                        <span className="text-xs sm:text-sm text-gray-600">{mood.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Journal Connection */}
              <Card className="p-6 slide-up border-2 border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Jurnal Terkait</h2>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{journalEntries.length}</div>
                  <p className="text-gray-600 text-sm mb-6">Entri Jurnal</p>
                  <Link to="/journal" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 inline-block text-center">
                    Tulis Jurnal Hari Ini
                  </Link>
                </div>
              </Card>
            </div>

            {/* Statistics Section */}
            <div className="space-y-6">
              <Card className="p-6 slide-up border-2 border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Statistik Mood</h2>
                </div>

                {/* Period Selection */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setSelectedPeriod('7hari')}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedPeriod === '7hari'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-300'
                    }`}
                  >
                    <div className="text-lg font-semibold">7 Hari</div>
                  </button>
                  <button
                    onClick={() => setSelectedPeriod('30hari')}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedPeriod === '30hari'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-300'
                    }`}
                  >
                    <div className="text-lg font-semibold">30 Hari</div>
                  </button>
                </div>

                {/* Month Selection */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setSelectedPeriod('januari')}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedPeriod === 'januari'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-300'
                    }`}
                  >
                    <div className="text-sm font-medium">Januari 2026</div>
                  </button>
                  <button
                    onClick={() => setSelectedPeriod('semua')}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedPeriod === 'semua'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-300'
                    }`}
                  >
                    <div className="text-sm font-medium">Semua Waktu</div>
                  </button>
                </div>

                {/* Average Mood Display */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl mb-6 border border-emerald-200">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-emerald-600 mb-2">
                      {stats.averageMood > 0 ? stats.averageMood.toFixed(1) : '0.0'}
                    </div>
                    <div className="text-emerald-600 text-sm font-medium">/ 5.0</div>
                    <div className="text-gray-800 font-semibold mt-2">Rata-rata Mood</div>
                  </div>
                </div>

                {/* Mood Distribution */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Distribusi Mood (7 Hari Terakhir)</h3>

                  {stats.totalEntries > 0 ? (
                    <div className="space-y-4">
                      {moodOptions.map(mood => {
                        const count = moodHistory.filter(entry => entry.mood === mood.value).length;
                        const percentage = stats.totalEntries > 0 ? Math.round((count / stats.totalEntries) * 100) : 0;
                        return (
                          <div key={mood.value} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{mood.emoji}</span>
                              <div className="flex-1">
                                <div className="flex justify-between text-sm mb-2">
                                  <span className="text-gray-700 font-medium">{mood.label}</span>
                                  <span className="text-gray-600 font-semibold">{count} hari ({percentage}%)</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                  <div
                                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                      <div className="text-4xl mb-4">📊</div>
                      <p className="font-medium">Belum ada data mood yang dicatat untuk periode ini.</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-12">
            <Card className="p-8 slide-up border-2 border-emerald-200/60 rounded-3xl">
              <div className="flex items-center space-x-3 mb-6">
                <Lightbulb className="w-8 h-8 text-emerald-500" />
                <h2 className="text-2xl font-semibold text-gray-800">Tips Agar Tracking Mood Lebih Optimal</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 font-semibold text-sm">•</span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold text-emerald-700">Konsistensi adalah Kunci:</span> Catat mood-mu setiap hari di jam yang sama untuk hasil yang lebih akurat dan menemukan pola yang jelas.
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 font-semibold text-sm">•</span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold text-emerald-700">Cari Pola:</span> Setelah beberapa minggu, lihat grafikmu. Pola mood-mu akan membantu mengidentifikasi pemicu stres atau aktivitas yang meningkatkan suasana hati.
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-600 font-semibold text-sm">•</span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold text-emerald-700">Hubungkan dengan Jurnal:</span> Gunakan fitur Journal Mood untuk mencatat detail perasaanmu. Ini memberikan konteks mengapa kamu merasa seperti itu pada hari tertentu.
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

export default MoodTracker;
