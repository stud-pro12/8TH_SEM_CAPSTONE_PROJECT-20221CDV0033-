import { useState } from 'react';
import { sendReminderNotification, sendWelcomeNotification } from '../utils/api';

function NotificationButton({ type = 'reminder', user }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendNotification = async () => {
    setLoading(true);
    setMessage('');

    try {
      let response;
      if (type === 'reminder') {
        response = await sendReminderNotification();
      } else if (type === 'welcome') {
        response = await sendWelcomeNotification();
      }

      setMessage('✅ SMS sent to ' + user.phone);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Notification error:', error);
      setMessage('❌ Failed to send SMS');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <button
        onClick={handleSendNotification}
        disabled={loading}
        style={{
          padding: '8px 16px',
          backgroundColor: '#ff9933',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          opacity: loading ? 0.6 : 1
        }}
      >
        {loading ? '📤 Sending...' : '📱 Test SMS'}
      </button>
      {message && (
        <span style={{ marginLeft: '12px', fontSize: '14px', fontWeight: '600' }}>
          {message}
        </span>
      )}
    </div>
  );
}

export default NotificationButton;