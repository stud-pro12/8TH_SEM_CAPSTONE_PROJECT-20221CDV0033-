import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Pages
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ModulesPage from './pages/ModulesPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import QuizPage from './pages/QuizPage';
import ProfilePage from './pages/ProfilePage';
import Chatbot from './components/Chatbot';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DBTCheckerPage from './pages/DBTCheckerPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar user={user} logout={logout} />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage setUser={setUser} />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage setUser={setUser} />} />
            <Route path="/dashboard" element={user ? <DashboardPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/modules" element={user ? <ModulesPage user={user} /> : <Navigate to="/login" />} />
            <Route path="/modules/:id" element={user ? <ModuleDetailPage user={user} setUser={setUser} /> : <Navigate to="/login" />} />
            <Route path="/quiz" element={user ? <QuizPage user={user} setUser={setUser} /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <ProfilePage user={user} /> : <Navigate to="/login" />} />
            <Route path="/dbt-checker" element={user ? <DBTCheckerPage /> : <Navigate to="/login" />} />
          </Routes>
        </main>

        <Footer />
        {/* Add Chatbot - shows only when logged in */}
        {user && <Chatbot user={user} />}
      </div>
    </Router>
  );
}

export default App;