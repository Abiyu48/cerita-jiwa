import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const { user } = useAuth();
  const [moodHistory, setMoodHistory] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [gratitudeSeeds, setGratitudeSeeds] = useState([]);
  const [worryVault, setWorryVault] = useState([]);
  const [currentMood, setCurrentMood] = useState(null);

  // Admin state
  const [allUsers, setAllUsers] = useState([]);
  const [allContent, setAllContent] = useState([]);
  const [adminAuditLog, setAdminAuditLog] = useState([]);
  const [systemNotifications, setSystemNotifications] = useState([]);

  // Load user-specific data when user changes
  useEffect(() => {
    if (user) {
      const userMoodHistoryKey = `ceritajiwa_mood_history_${user.id}`;
      const userJournalEntriesKey = `ceritajiwa_journal_entries_${user.id}`;

      const savedMoodHistory = localStorage.getItem(userMoodHistoryKey);
      const savedJournalEntries = localStorage.getItem(userJournalEntriesKey);
      const savedGratitudeSeeds = localStorage.getItem(`ceritajiwa_gratitude_seeds_${user.id}`);
      const savedWorryVault = localStorage.getItem(`ceritajiwa_worry_vault_${user.id}`);

      if (savedMoodHistory) {
        setMoodHistory(JSON.parse(savedMoodHistory));
      } else {
        setMoodHistory([]);
      }

      if (savedJournalEntries) {
        setJournalEntries(JSON.parse(savedJournalEntries));
      } else {
        setJournalEntries([]);
      }

      if (savedGratitudeSeeds) {
        setGratitudeSeeds(JSON.parse(savedGratitudeSeeds));
      } else {
        setGratitudeSeeds([]);
      }

      if (savedWorryVault) {
        setWorryVault(JSON.parse(savedWorryVault));
      } else {
        setWorryVault([]);
      }
    } else {
      // Clear data when no user is logged in
      setMoodHistory([]);
      setJournalEntries([]);
      setGratitudeSeeds([]);
      setWorryVault([]);
      setCurrentMood(null);
    }
  }, [user]);

  const addMoodEntry = (mood, note = '') => {
    if (!user) return;

    const newEntry = {
      id: Date.now(),
      userId: user.id,
      mood,
      note,
      date: new Date().toISOString(),
    };

    const updatedHistory = [newEntry, ...moodHistory];
    setMoodHistory(updatedHistory);
    setCurrentMood(mood);
    const userMoodHistoryKey = `ceritajiwa_mood_history_${user.id}`;
    localStorage.setItem(userMoodHistoryKey, JSON.stringify(updatedHistory));
  };

  const addJournalEntry = (title, content, emotion = '') => {
    if (!user) return;

    const newEntry = {
      id: Date.now(),
      userId: user.id,
      title,
      content,
      emotion,
      date: new Date().toISOString(),
    };

    const updatedEntries = [newEntry, ...journalEntries];
    setJournalEntries(updatedEntries);
    const userJournalEntriesKey = `ceritajiwa_journal_entries_${user.id}`;
    localStorage.setItem(userJournalEntriesKey, JSON.stringify(updatedEntries));
  };

  const deleteJournalEntry = (id) => {
    if (!user) return;

    const updatedEntries = journalEntries.filter(entry => entry.id !== id);
    setJournalEntries(updatedEntries);
    const userJournalEntriesKey = `ceritajiwa_journal_entries_${user.id}`;
    localStorage.setItem(userJournalEntriesKey, JSON.stringify(updatedEntries));
  };

  const addGratitudeSeed = (text) => {
    if (!user) return;

    const newSeed = {
      id: Date.now(),
      text,
      date: new Date().toISOString(),
    };

    const updatedSeeds = [newSeed, ...gratitudeSeeds];
    setGratitudeSeeds(updatedSeeds);
    const userGratitudeSeedsKey = `ceritajiwa_gratitude_seeds_${user.id}`;
    localStorage.setItem(userGratitudeSeedsKey, JSON.stringify(updatedSeeds));
  };

  const addWorry = (text, category) => {
    if (!user) return;

    const newWorry = {
      id: Date.now(),
      text,
      category,
      date: new Date().toISOString(),
    };

    const updatedWorries = [newWorry, ...worryVault];
    setWorryVault(updatedWorries);
    const userWorryVaultKey = `ceritajiwa_worry_vault_${user.id}`;
    localStorage.setItem(userWorryVaultKey, JSON.stringify(updatedWorries));
  };

  const getTodayMood = () => {
    const today = new Date().toDateString();
    return moodHistory.find(entry => 
      new Date(entry.date).toDateString() === today
    );
  };

  const getAverageMood = () => {
    if (moodHistory.length === 0) return 0;
    const sum = moodHistory.reduce((acc, entry) => acc + entry.mood, 0);
    return Math.round(sum / moodHistory.length);
  };

  // Admin functions for system-wide data access
  const getSystemStats = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('ceritajiwa_registered_users') || '[]');
    const defaultUsers = [
      { id: 1, email: 'admin@ceritajiwa.com' },
      { id: 2, email: 'support@ceritajiwa.com' },
      { id: 3, email: 'user@example.com' }
    ];
    const allUsers = [...defaultUsers, ...registeredUsers];

    let totalMoods = 0;
    let totalJournals = 0;
    let pendingReviews = 0;
    let reportedContent = 0;
    let activeUsersToday = 0;
    let activeUsersWeek = 0;

    const moodDistribution = { positive: 0, neutral: 0, negative: 0 };
    const today = new Date().toDateString();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Collect data from all users
    allUsers.forEach(user => {
      const userMoodKey = `ceritajiwa_mood_history_${user.id}`;
      const userJournalKey = `ceritajiwa_journal_entries_${user.id}`;

      const userMoods = JSON.parse(localStorage.getItem(userMoodKey) || '[]');
      const userJournals = JSON.parse(localStorage.getItem(userJournalKey) || '[]');

      // Count moods
      userMoods.forEach(mood => {
        totalMoods++;
        if (mood.mood >= 4) moodDistribution.positive++;
        else if (mood.mood === 3) moodDistribution.neutral++;
        else moodDistribution.negative++;

        // Check activity
        const moodDate = new Date(mood.date);
        if (moodDate.toDateString() === today) activeUsersToday++;
        if (moodDate >= weekAgo) activeUsersWeek++;
      });

      // Count journals
      userJournals.forEach(journal => {
        totalJournals++;
        if (journal.status === 'pending') pendingReviews++;
        if (journal.reports && journal.reports > 0) reportedContent += journal.reports;
      });
    });

    return {
      totalUsers: allUsers.length,
      totalMoods,
      totalJournals,
      pendingReviews,
      reportedContent,
      activeUsersToday,
      activeUsersWeek,
      moodDistribution
    };
  };

  const getAllUsers = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('ceritajiwa_registered_users') || '[]');
    const defaultUsers = [
      { id: 1, email: 'admin@ceritajiwa.com', name: 'Admin', role: 'admin' },
      { id: 2, email: 'support@ceritajiwa.com', name: 'Support', role: 'support' },
      { id: 3, email: 'user@example.com', name: 'User', role: 'user' }
    ];

    return [...defaultUsers, ...registeredUsers].map(user => {
      const userMoodKey = `ceritajiwa_mood_history_${user.id}`;
      const userJournalKey = `ceritajiwa_journal_entries_${user.id}`;

      const userMoods = JSON.parse(localStorage.getItem(userMoodKey) || '[]');
      const userJournals = JSON.parse(localStorage.getItem(userJournalKey) || '[]');

      const lastActivity = [...userMoods, ...userJournals]
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

      return {
        ...user,
        username: user.name || user.username || 'Unknown',
        totalJournals: userJournals.length,
        totalMoods: userMoods.length,
        lastActivity: lastActivity ? new Date(lastActivity.date).toLocaleString('id-ID') : 'Never',
        status: user.status || 'active',
        riskLevel: userMoods.length > 0 ?
          (userMoods.filter(m => m.mood <= 2).length / userMoods.length > 0.5 ? 'high' :
           userMoods.filter(m => m.mood <= 2).length / userMoods.length > 0.3 ? 'medium' : 'low') : 'low',
        joinDate: user.joinDate || new Date().toLocaleDateString('id-ID'),
        totalReports: userJournals.reduce((sum, j) => sum + (j.reports || 0), 0),
        moodTrend: userMoods.length > 1 ?
          (userMoods[0].mood > userMoods[userMoods.length - 1].mood ? 'improving' :
           userMoods[0].mood < userMoods[userMoods.length - 1].mood ? 'declining' : 'stable') : 'stable',
        recentActivity: userJournals.slice(0, 3).map(j => ({
          type: 'journal',
          content: j.title,
          time: new Date(j.date).toLocaleString('id-ID')
        }))
      };
    });
  };

  const getAllContent = () => {
    const allContent = [];
    const registeredUsers = JSON.parse(localStorage.getItem('ceritajiwa_registered_users') || '[]');
    const defaultUsers = [
      { id: 1, email: 'admin@ceritajiwa.com' },
      { id: 2, email: 'support@ceritajiwa.com' },
      { id: 3, email: 'user@example.com' }
    ];
    const allUsers = [...defaultUsers, ...registeredUsers];

    allUsers.forEach(user => {
      const userJournalKey = `ceritajiwa_journal_entries_${user.id}`;
      const userJournals = JSON.parse(localStorage.getItem(userJournalKey) || '[]');

      userJournals.forEach(journal => {
        // Risk analysis
        const sensitiveWords = ['depresi', 'bunuh', 'mati', 'takut', 'sendiri', 'putus asa', 'overwhelmed', 'stress', 'anxiety'];
        const foundSensitiveWords = sensitiveWords.filter(word =>
          journal.content.toLowerCase().includes(word.toLowerCase())
        );

        let riskLevel = 'low';
        if (foundSensitiveWords.length > 2) riskLevel = 'high';
        else if (foundSensitiveWords.length > 0) riskLevel = 'medium';

        allContent.push({
          ...journal,
          type: 'journal',
          author: `User_${user.id.toString().padStart(4, '0')}`,
          riskLevel,
          sensitiveWords: foundSensitiveWords,
          tags: foundSensitiveWords.map(word => word),
          status: journal.status || 'published',
          title: journal.title || 'Untitled Journal',
          content: journal.content || '',
          createdAt: new Date(journal.date).toLocaleDateString('id-ID'),
          reports: journal.reports || 0
        });
      });
    });

    return allContent.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const updateContentStatus = (contentId, newStatus, adminId) => {
    // Find and update content status
    const allContent = getAllContent();
    const content = allContent.find(c => c.id === contentId);

    if (content) {
      // Update in user's localStorage
      const userJournalKey = `ceritajiwa_journal_entries_${content.userId}`;
      const userJournals = JSON.parse(localStorage.getItem(userJournalKey) || '[]');
      const updatedJournals = userJournals.map(j =>
        j.id === contentId ? { ...j, status: newStatus } : j
      );
      localStorage.setItem(userJournalKey, JSON.stringify(updatedJournals));

      // Log admin action
      logAdminAction(adminId, 'content_moderation', `Updated content ${contentId} status to ${newStatus}`);
    }
  };

  const updateUserStatus = (userId, newStatus, adminId) => {
    const registeredUsers = JSON.parse(localStorage.getItem('ceritajiwa_registered_users') || '[]');
    const userIndex = registeredUsers.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
      registeredUsers[userIndex].status = newStatus;
      localStorage.setItem('ceritajiwa_registered_users', JSON.stringify(registeredUsers));

      // Log admin action
      logAdminAction(adminId, 'user_management', `Updated user ${userId} status to ${newStatus}`);
    }
  };

  const logAdminAction = (adminId, actionType, description) => {
    const auditLog = JSON.parse(localStorage.getItem('ceritajiwa_admin_audit_log') || '[]');
    auditLog.push({
      id: Date.now(),
      adminId,
      actionType,
      description,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('ceritajiwa_admin_audit_log', JSON.stringify(auditLog));
  };

  const getAuditLog = () => {
    return JSON.parse(localStorage.getItem('ceritajiwa_admin_audit_log') || '[]')
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const value = {
    moodHistory,
    journalEntries,
    gratitudeSeeds,
    worryVault,
    currentMood,
    addMoodEntry,
    addJournalEntry,
    deleteJournalEntry,
    addGratitudeSeed,
    addWorry,
    getTodayMood,
    getAverageMood,
    // Admin functions
    getSystemStats,
    getAllUsers,
    getAllContent,
    updateContentStatus,
    updateUserStatus,
    logAdminAction,
    getAuditLog,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};