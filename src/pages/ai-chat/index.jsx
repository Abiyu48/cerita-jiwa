import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  MessageCircle,
  Plus,
  Filter,
  Trash2,
  Send,
  Heart,
  Smile,
  Meh,
  Frown,
  Angry,
} from 'lucide-react';

const AIChat = () => {
  const { user } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [filter, setFilter] = useState('Semua');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const [chatHistory, setChatHistory] = useState([]);

  const emotionFilters = [
    { label: 'Semua', icon: null, count: chatHistory.length },
    { label: '😔', icon: Frown, count: chatHistory.filter(r => r.emotion === '😔').length },
    { label: '😊', icon: Smile, count: chatHistory.filter(r => r.emotion === '😊').length },
    { label: '😐', icon: Meh, count: chatHistory.filter(r => r.emotion === '😐').length },
    { label: '😢', icon: Frown, count: chatHistory.filter(r => r.emotion === '😢').length },
    { label: '😠', icon: Angry, count: chatHistory.filter(r => r.emotion === '😠').length }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Detect emotion from message
  const detectEmotion = (message) => {
    const msg = message.toLowerCase();
    
    if (msg.includes('sedih') || msg.includes('putus') || msg.includes('sakit hati')) return '😔';
    if (msg.includes('marah') || msg.includes('kesal') || msg.includes('emosi')) return '😠';
    if (msg.includes('khawatir') || msg.includes('takut') || msg.includes('cemas')) return '😢';
    if (msg.includes('bahagia') || msg.includes('senang') || msg.includes('gembira')) return '😊';
    
    return '😐';
  };

  const createNewRoom = () => {
    const newRoom = {
      id: Date.now(),
      title: 'Ruangan curhat baru',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      emotion: '😐',
      lastMessage: 'Memulai percakapan baru...',
      unread: 0,
      messages: []
    };

    setChatHistory([newRoom, ...chatHistory]);
    setSelectedRoom(newRoom.id);
    setMessages([
      {
        id: 1,
        text: 'Hai! Aku Jiwamu. Aku di sini untuk mendengarkan curhatanmu. Ceritakan apa yang sedang kamu rasakan, aku siap mendengar tanpa menghakimi. 💙',
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  };

  const selectRoom = (room) => {
    setSelectedRoom(room.id);
    setMessages(room.messages || [
      {
        id: 1,
        text: 'Hai! Aku Jiwamu. Aku di sini untuk mendengarkan curhatanmu. Ceritakan apa yang sedang kamu rasakan, aku siap mendengar tanpa menghakimi. 💙',
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  };

  const updateChatHistory = (roomId, newMessages, lastUserMessage) => {
    setChatHistory(prev => prev.map(room => {
      if (room.id === roomId) {
        const emotion = detectEmotion(lastUserMessage);
        return {
          ...room,
          messages: newMessages,
          lastMessage: lastUserMessage.substring(0, 50) + (lastUserMessage.length > 50 ? '...' : ''),
          emotion: emotion,
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };
      }
      return room;
    }));
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    const currentMessage = newMessage;
    setNewMessage('');
    setIsTyping(true);
    setError(null);

    try {
      // Call backend API
      const response = await fetch('http://localhost:3001/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          conversationHistory: messages.slice(-10).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const aiResponse = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'ai',
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      updateChatHistory(selectedRoom, finalMessages, currentMessage);

    } catch (error) {
      console.error('Error getting AI response:', error);
      setError('Gagal terhubung ke server. Pastikan server berjalan di http://localhost:3001');
      
      // Fallback response
      const aiResponse = {
        id: Date.now() + 1,
        text: 'Maaf, saya mengalami kesulitan teknis. Silakan coba lagi atau pastikan server sudah berjalan. 🙏',
        sender: 'ai',
        timestamp: new Date()
      };
      
      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      updateChatHistory(selectedRoom, finalMessages, currentMessage);
    } finally {
      setIsTyping(false);
    }
  };

  const deleteAllHistory = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua riwayat?')) {
      setChatHistory([]);
      setSelectedRoom(null);
      setMessages([]);
    }
  };

  const filteredHistory = chatHistory.filter(room => {
    if (filter === 'Semua') return true;
    return room.emotion === filter;
  });

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
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="text-center slide-up">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              AI <span className="text-emerald-500">Companion</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Teman curhat AI yang selalu siap mendengarkan tanpa menghakimi
            </p>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 max-w-2xl mx-auto">
                ⚠️ {error}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat History Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Create New Room */}
            <Card className="p-6 slide-up border-2 border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl">
              <Button
                onClick={createNewRoom}
                className="w-full bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Buat Ruangan Baru
              </Button>
            </Card>

            {/* Filter */}
            <Card className="p-6 slide-up border-2 border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-800">Filter Perasaan</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {emotionFilters.map((emotion) => (
                  <button
                    key={emotion.label}
                    onClick={() => setFilter(emotion.label)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      filter === emotion.label
                        ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {emotion.icon ? <emotion.icon className="w-4 h-4 mx-auto mb-1" /> : emotion.label}
                    {emotion.count > 0 && (
                      <span className="text-xs bg-emerald-200 text-emerald-800 px-1 rounded-full ml-1">
                        {emotion.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </Card>

            {/* Chat History */}
            <Card className="p-6 slide-up border-2 border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Riwayat Curhat</h3>
                {chatHistory.length > 0 && (
                  <button
                    onClick={deleteAllHistory}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus Semua Riwayat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {filteredHistory.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Belum ada riwayat curhat</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredHistory.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => selectRoom(room)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedRoom === room.id
                          ? 'bg-emerald-50 ring-2 ring-emerald-300'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-800 text-sm line-clamp-2 flex-1">
                          {room.lastMessage}
                        </h4>
                        {room.unread > 0 && (
                          <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                            {room.unread}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{room.emotion}</span>
                        <span>{room.date} {room.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            {selectedRoom ? (
              <Card className="h-[600px] flex flex-col slide-up border-2 border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl">
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-sky-500 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Jiwamu - Teman Curhat AI</h3>
                      <p className="text-sm text-gray-600">Selalu siap mendengarkan tanpa menghakimi</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-emerald-200' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-gray-100">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                      placeholder="Tulis pesan Anda di sini..."
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!newMessage.trim() || isTyping}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-[600px] flex items-center justify-center slide-up border-2 border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-sky-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Talk Room</h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    Ruang aman untuk berbagi perasaan dengan AI yang selalu siap mendengarkan tanpa menghakimi
                  </p>
                  <Button
                    onClick={createNewRoom}
                    className="bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Mulai Curhat
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;