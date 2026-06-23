import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = [
  { id: 1, email: 'saurabhchobeyss@gmail.com', password: 'demo123', name: 'Shorabh Chobey', role: 'Claims Analyst', avatar: 'SC', plan: 'Premium Plus', memberId: 'HPL-2024-7821' },
  { id: 2, email: 'monish@gmail.com', password: 'demo123', name: 'Monish Lalani', role: 'Senior Reviewer', avatar: 'ML', plan: 'Enterprise', memberId: 'HPL-2024-3456' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const login = (email, password) => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) { setUser(found); setError(''); return true; }
    setError('Invalid credentials. Try saurabhchobeyss@gmail.com / demo123');
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
