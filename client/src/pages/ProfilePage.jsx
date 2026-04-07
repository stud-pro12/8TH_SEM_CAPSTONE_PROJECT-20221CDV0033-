import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationButton from '../components/NotificationButton';
import FeedbackForm from '../components/FeedbackForm';

function ProfilePage({ user }) {
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);

  const completedCount = user.completedModules?.length || 0;
  const totalModules = 5;
  const progress = (completedCount / totalModules) * 100;

  const downloadCertificate = () => {
    if (!user.certificateIssued) {
      alert('Complete all modules and score 80% in the quiz to unlock your certificate!');
      return;
    }

    // Create certificate content
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Times New Roman', serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .certificate {
            width: 800px;
            padding: 60px;
            background: white;
            border: 20px solid;
            border-image: linear-gradient(135deg, #ff9933, #138808, #1a4d8f) 1;
            text-align: center;
          }
          .emblem {
            font-size: 60px;
            margin-bottom: 20px;
          }
          h1 {
            color: #1a4d8f;
            font-size: 48px;
            margin: 20px 0;
          }
          .recipient {
            font-size: 32px;
            color: #333;
            margin: 30px 0;
            font-style: italic;
          }
          .description {
            font-size: 18px;
            color: #666;
            line-height: 1.8;
            margin: 30px 0;
          }
          .score {
            font-size: 24px;
            color: #138808;
            font-weight: bold;
            margin: 20px 0;
          }
          .footer {
            margin-top: 50px;
            display: flex;
            justify-content: space-around;
          }
          .signature {
            text-align: center;
          }
          .line {
            border-top: 2px solid #333;
            width: 200px;
            margin: 10px auto;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="emblem">🇮🇳</div>
          <h1>CERTIFICATE OF COMPLETION</h1>
          <p style="font-size: 20px; color: #666;">This is to certify that</p>
          <div class="recipient">${user.name}</div>
          <div class="description">
            has successfully completed the <strong>ScholarSure DBT Awareness Program</strong>
            conducted by the Ministry of Social Justice & Empowerment, Government of India.
            <br/><br/>
            The candidate has demonstrated comprehensive understanding of Direct Benefit Transfer
            (DBT) mechanisms and Aadhaar-enabled banking services.
          </div>
          <div class="score">
            Quiz Score: ${user.quizScore}%
          </div>
          <div class="footer">
            <div class="signature">
              <div class="line"></div>
              <p><strong>Program Director</strong><br/>ScholarSure Initiative</p>
            </div>
            <div class="signature">
              <div class="line"></div>
              <p><strong>Ministry Official</strong><br/>Govt. of India</p>
            </div>
          </div>
          <p style="margin-top: 40px; font-size: 14px; color: #999;">
            Certificate ID: SS${user.id}-${Date.now()}<br/>
            Date of Issue: ${new Date().toLocaleDateString('en-IN')}
          </p>
        </div>
      </body>
      </html>
    `;

    // Open certificate in new window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(certificateHTML);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f5f5f5', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Profile Header */}
        <div className="card" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%', 
            backgroundColor: '#1a4d8f',
            color: 'white',
            fontSize: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontWeight: 'bold'
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          
          <h1 style={{ fontSize: '32px', color: '#1a4d8f', marginBottom: '8px' }}>
            {user.name}
          </h1>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '4px' }}>
            {user.email}
          </p>
          <p style={{ fontSize: '16px', color: '#999' }}>
            {user.college} • {user.state}
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          
          {/* Modules Progress */}
          <div className="card">
            <h3 style={{ fontSize: '18px', color: '#666', marginBottom: '12px' }}>Modules Completed</h3>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1a4d8f', marginBottom: '12px' }}>
              {completedCount} / {totalModules}
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          {/* Quiz Score */}
          <div className="card">
            <h3 style={{ fontSize: '18px', color: '#666', marginBottom: '12px' }}>Quiz Performance</h3>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ff9933', marginBottom: '12px' }}>
              {user.quizScore || 0}%
            </div>
            <p style={{ fontSize: '14px', color: '#666' }}>
              {user.quizScore >= 80 ? 'Excellent! 🎉' : 'Keep practicing 📚'}
            </p>
          </div>

          {/* Certificate Status */}
          <div className="card">
            <h3 style={{ fontSize: '18px', color: '#666', marginBottom: '12px' }}>Certificate</h3>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>
              {user.certificateIssued ? '🏆' : '🔒'}
            </div>
            <p style={{ fontSize: '14px', color: '#666' }}>
              {user.certificateIssued ? 'Earned!' : 'Not Yet Earned'}
            </p>
          </div>
        </div>

        {/* Certificate Section */}
        <div className="card" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', color: '#1a4d8f', marginBottom: '16px' }}>
            🎓 Your Certificate
          </h2>
          
          {user.certificateIssued ? (
            <>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>
                Congratulations! You've earned your ScholarSure certificate.
              </p>
              <button 
                onClick={downloadCertificate}
                className="btn btn-primary"
                style={{ padding: '16px 48px', fontSize: '18px' }}
              >
                Download Certificate 📄
              </button>
            </>
          ) : (
            <>
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '16px' }}>
                Complete the requirements to unlock your certificate:
              </p>
              
              <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '24px' }}>
                    {completedCount === totalModules ? '✅' : '⭕'}
                  </span>
                  <span style={{ color: '#666' }}>
                    Complete all 5 modules ({completedCount}/5)
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>
                    {user.quizScore >= 80 ? '✅' : '⭕'}
                  </span>
                  <span style={{ color: '#666' }}>
                    Score 80% or more in quiz ({user.quizScore || 0}%)
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {completedCount < totalModules && (
                  <button 
                    onClick={() => navigate('/modules')}
                    className="btn btn-primary"
                  >
                    Continue Modules
                  </button>
                )}
                {user.quizScore < 80 && (
                  <button 
                    onClick={() => navigate('/quiz')}
                    className="btn btn-secondary"
                  >
                    Take Quiz
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Account Information */}
        <div className="card" style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '24px', color: '#1a4d8f', marginBottom: '20px' }}>
            Account Information
          </h2>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '12px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
              <strong style={{ color: '#666' }}>Full Name:</strong>
              <span>{user.name}</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '12px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
              <strong style={{ color: '#666' }}>Email:</strong>
              <span>{user.email}</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '12px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
              <strong style={{ color: '#666' }}>College:</strong>
              <span>{user.college}</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '12px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
              <strong style={{ color: '#666' }}>State:</strong>
              <span>{user.state}</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '12px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
              <strong style={{ color: '#666' }}>Preferred Language:</strong>
              <span>{user.language || 'English'}</span>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card" style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '24px', color: '#1a4d8f', marginBottom: '20px' }}>
            📱 SMS Notifications
          </h2>
          
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '12px' }}>
              Receive updates via SMS on your registered mobile number
            </p>
            <div style={{ 
              padding: '12px', 
              backgroundColor: '#f0f7ff', 
              borderRadius: '4px',
              fontSize: '14px',
              color: '#1a4d8f'
            }}>
              📞 <strong>Registered Mobile:</strong> {user.phone}
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>You'll receive SMS for:</h3>
            <ul style={{ fontSize: '14px', color: '#666', lineHeight: '2' }}>
              <li>✅ Module completion updates</li>
              <li>✅ Quiz results and certificate status</li>
              <li>✅ DBT account verification results</li>
              <li>✅ Important reminders and deadlines</li>
            </ul>
          </div>

          <div style={{ 
            padding: '16px', 
            backgroundColor: '#fff3e0', 
            borderRadius: '4px',
            marginBottom: '16px'
          }}>
            <strong>💡 Test SMS Feature:</strong>
            <p style={{ fontSize: '14px', margin: '8px 0 12px' }}>
              Click below to receive a test SMS notification
            </p>
            <NotificationButton type="reminder" user={user} />
          </div>

          <div className="alert alert-info">
            <strong>📌 Note:</strong> SMS notifications are sent to help you track your learning progress. 
            All messages are free and you can opt-out anytime by contacting support.
          </div>
        </div>

        {/* Feedback Section */}
<div className="card" style={{ 
  marginTop: '32px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  textAlign: 'center'
}}>
  <div style={{ fontSize: '64px', marginBottom: '16px' }}>💭</div>
  <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>
    Share Your Feedback
  </h2>
  <p style={{ fontSize: '16px', marginBottom: '24px', opacity: 0.95 }}>
    Help us improve ScholarSure! Your feedback helps thousands of students.
  </p>
  <button
    onClick={() => setShowFeedback(true)}
    style={{
      padding: '16px 40px',
      fontSize: '18px',
      fontWeight: '600',
      backgroundColor: 'white',
      color: '#667eea',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
    }}
  >
    Give Feedback ✨
  </button>
</div>

        {/* Achievements */}
        <div className="card" style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '24px', color: '#1a4d8f', marginBottom: '20px' }}>
            🏅 Achievements
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
            <div style={{ 
              padding: '20px', 
              textAlign: 'center', 
              backgroundColor: completedCount >= 1 ? '#e8f5e9' : '#f5f5f5',
              borderRadius: '8px',
              opacity: completedCount >= 1 ? 1 : 0.5
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📖</div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>First Module</div>
            </div>

            <div style={{ 
              padding: '20px', 
              textAlign: 'center', 
              backgroundColor: completedCount >= 3 ? '#e8f5e9' : '#f5f5f5',
              borderRadius: '8px',
              opacity: completedCount >= 3 ? 1 : 0.5
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎯</div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>Halfway There</div>
            </div>

            <div style={{ 
              padding: '20px', 
              textAlign: 'center', 
              backgroundColor: completedCount === 5 ? '#e8f5e9' : '#f5f5f5',
              borderRadius: '8px',
              opacity: completedCount === 5 ? 1 : 0.5
            }}><div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>All Modules</div>
            </div>
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          backgroundColor: user.quizScore >= 80 ? '#e8f5e9' : '#f5f5f5',
          borderRadius: '8px',
          opacity: user.quizScore >= 80 ? 1 : 0.5
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏆</div>
          <div style={{ fontSize: '14px', fontWeight: '600' }}>Quiz Master</div>
        </div>
      </div>
    </div>
  </div>
  {/* Feedback Modal */}
{showFeedback && (
  <FeedbackForm 
    user={user} 
    onClose={() => setShowFeedback(false)} 
  />
)}
</div>
);
}
export default ProfilePage;