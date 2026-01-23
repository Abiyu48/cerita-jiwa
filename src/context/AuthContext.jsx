import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy users untuk testing
  const defaultUsers = [
    { id: 1, email: 'admin@ceritajiwa.com', password: 'admin123', name: 'Admin', role: 'admin' },
    { id: 2, email: 'support@ceritajiwa.com', password: 'support123', name: 'Customer Support', role: 'support' },
    { id: 3, email: 'user@example.com', password: 'user123', name: 'Pengguna', role: 'user' },
  ];

  // Get all users (default + registered)
  const getAllUsers = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('ceritajiwa_registered_users') || '[]');
    return [...defaultUsers, ...registeredUsers];
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('ceritajiwa_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const allUsers = getAllUsers();
    const foundUser = allUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      localStorage.setItem('ceritajiwa_user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, message: 'Email atau password salah' };
  };

  const register = (name, email, password) => {
    const allUsers = getAllUsers();
    const existingUser = allUsers.find(u => u.email === email);
    
    if (existingUser) {
      return { success: false, message: 'Email sudah terdaftar' };
    }
    
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'user'
    };
    
    // Save to registered users
    const registeredUsers = JSON.parse(localStorage.getItem('ceritajiwa_registered_users') || '[]');
    registeredUsers.push(newUser);
    localStorage.setItem('ceritajiwa_registered_users', JSON.stringify(registeredUsers));
    
    // Auto login after register
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem('ceritajiwa_user', JSON.stringify(userWithoutPassword));
    
    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ceritajiwa_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};