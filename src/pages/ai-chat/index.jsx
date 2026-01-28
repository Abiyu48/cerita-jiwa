import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Plus, Filter, Trash2, Send, Heart, Smile, Meh, Frown, Angry } from 'lucide-react';

const AIChat = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [filter, setFilter] = useState('Semua');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [shouldScroll, setShouldScroll] = useState(true);

  // Get current user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.id) {
      setCurrentUser(user);
      loadUserChatHistory(user.id);
    }
  }, []);

  const emotionFilters = [
    { label: 'Semua', icon: null, count: chatHistory.length },
    { label: '😔', icon: Frown, count: chatHistory.filter(r => r.emotion === '😔').length },
    { label: '😊', icon: Smile, count: chatHistory.filter(r => r.emotion === '😊').length },
    { label: '😐', icon: Meh, count: chatHistory.filter(r => r.emotion === '😐').length },
    { label: '😢', icon: Frown, count: chatHistory.filter(r => r.emotion === '😢').length },
    { label: '😠', icon: Angry, count: chatHistory.filter(r => r.emotion === '😠').length }
  ];

  const scrollToBottom = (smooth = true) => {
    if (shouldScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end'
      });
    }
  };

  // Auto scroll ketika messages berubah
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history from backend
  const loadUserChatHistory = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/chat-history/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setChatHistory(data);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  // Save chat history to backend
  const saveChatHistory = async (userId, history) => {
    try {
      await fetch('http://localhost:3001/api/chat-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, chatHistory: history })
      });
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

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

    const updatedHistory = [newRoom, ...chatHistory];
    setChatHistory(updatedHistory);
    if (currentUser) {
      saveChatHistory(currentUser.id, updatedHistory);
    }
    
    setSelectedRoom(newRoom.id);
    setMessages([{
      id: 1,
      text: 'Hai! Aku Jiwamu. Aku di sini untuk mendengarkan curhatanmu. Ceritakan apa yang sedang kamu rasakan, aku siap mendengar tanpa menghakimi. 💙',
      sender: 'ai',
      timestamp: new Date()
    }]);
  };

  const selectRoom = (room) => {
    setSelectedRoom(room.id);
    setMessages(room.messages || [{
      id: 1,
      text: 'Hai! Aku Jiwamu. Aku di sini untuk mendengarkan curhatanmu. Ceritakan apa yang sedang kamu rasakan, aku siap mendengar tanpa menghakimi. 💙',
      sender: 'ai',
      timestamp: new Date()
    }]);
  };

  const updateChatHistory = (roomId, newMessages, lastUserMessage) => {
    const updatedHistory = chatHistory.map(room => {
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
    });
    
    setChatHistory(updatedHistory);
    if (currentUser) {
      saveChatHistory(currentUser.id, updatedHistory);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom || isTyping) return;

    // Lock scroll position sementara
    setShouldScroll(false);

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
    
    // Scroll ke message user baru setelah render
    setTimeout(() => {
      setShouldScroll(true);
      scrollToBottom(true);
    }, 100);

    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentMessage,
          conversationHistory: messages.slice(-10).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          }))
        })
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();

      // Delay untuk simulasi typing (1.5-2 detik)
      await new Promise(resolve => setTimeout(resolve, 1500));

      const aiResponse = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'ai',
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      updateChatHistory(selectedRoom, finalMessages, currentMessage);
      setIsTyping(false);

    } catch (error) {
      console.error('Error getting AI response:', error);
      setError('Gagal terhubung ke server. Pastikan server berjalan di http://localhost:3001');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse = {
        id: Date.now() + 1,
        text: 'Maaf, saya mengalami kesulitan teknis. Silakan coba lagi atau pastikan server sudah berjalan. 🙏',
        sender: 'ai',
        timestamp: new Date()
      };
      
      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      updateChatHistory(selectedRoom, finalMessages, currentMessage);
      setIsTyping(false);
    }
  };

  const deleteAllHistory = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua riwayat?')) {
      setChatHistory([]);
      setSelectedRoom(null);
      setMessages([]);
      
      if (currentUser) {
        try {
          await fetch(`http://localhost:3001/api/chat-history/${currentUser.id}`, {
            method: 'DELETE'
          });
        } catch (error) {
          console.error('Error deleting chat history:', error);
        }
      }
    }
  };

  const filteredHistory = chatHistory.filter(room => {
    if (filter === 'Semua') return true;
    return room.emotion === filter;
  });

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      {/* Soft Background Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-80 h-80 bg-sky-200/30 rounded-full blur-3xl top-1/3 -right-32 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl bottom-32 left-1/4 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="px-6 pt-32 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="text-center">
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
            <div className="p-6 bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
              <button
                onClick={createNewRoom}
                className="w-full bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Buat Ruangan Baru
              </button>
            </div>

            {/* Filter */}
            <div className="p-6 bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
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
            </div>

            {/* Chat History */}
            <div className="p-6 bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
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
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{room.emotion}</span>
                        <span>{room.date} {room.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            {selectedRoom ? (
              <div className="h-[600px] flex flex-col bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
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
                <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto space-y-4">
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

                  {/* Typing Animation */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-6 py-4 rounded-2xl">
                        <div className="flex space-x-2">
                          <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey && !isTyping) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      placeholder="Tulis pesan Anda di sini..."
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                      disabled={isTyping}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim() || isTyping}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[600px] flex items-center justify-center bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-emerald-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-sky-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Talk Room</h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    Ruang aman untuk berbagi perasaan dengan AI yang selalu siap mendengarkan tanpa menghakimi
                  </p>
                  <button
                    onClick={createNewRoom}
                    className="bg-gradient-to-r from-emerald-400 to-sky-500 hover:from-emerald-500 hover:to-sky-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Mulai Curhat
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
