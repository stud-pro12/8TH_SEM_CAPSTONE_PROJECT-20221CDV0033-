import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllModules } from '../utils/api';

function DashboardPage({ user }) {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await getAllModules();
      setModules(response.data.modules);
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  const completedCount = user.completedModules?.length || 0;
  const totalModules = 5;
  const progress = (completedCount / totalModules) * 100;

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container">
        
        {/* Welcome Section */}
        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '32px', color: '#1a4d8f', marginBottom: '8px' }}>
            Welcome back, {user.name}! 👋
          </h1>
          <p style={{ color: '#666', fontSize: '18px' }}>
            {user.college} • {user.state}
          </p>
        </div>

        {/* Progress Section */}
        <div className="card" style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#1a4d8f' }}>Your Learning Progress</h2>
          
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '600' }}>Modules Completed</span>
              <span style={{ fontWeight: '600', color: '#138808' }}>{completedCount} / {totalModules}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginTop: '24px' }}>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f0f7ff', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a4d8f' }}>{progress.toFixed(0)}%</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Course Progress</div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ff9933' }}>{user.quizScore || 0}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Quiz Score</div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: user.certificateIssued ? '#e8f5e9' : '#f5f5f5', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px' }}>{user.certificateIssued ? '✅' : '🔒'}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {user.certificateIssued ? 'Certified!' : 'Certificate Locked'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#1a4d8f' }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          
          <Link to="/modules" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>📚</div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#1a4d8f' }}>Continue Learning</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Resume your modules and complete your learning journey
              </p>
            </div>
          </Link>

          <Link to="/quiz" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎯</div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#ff9933' }}>Take Quiz</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Test your knowledge and earn points towards certification
              </p>
            </div>
          </Link>

          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>👤</div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#138808' }}>View Profile</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Check your achievements and download certificate
              </p>
            </div>
          </Link>
        </div>

        {/* Important Info */}
        <div className="alert alert-info">
          <strong>💡 Pro Tip:</strong> Complete all 5 modules and score 80% or more in the quiz to earn your official ScholarSure certificate!
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;