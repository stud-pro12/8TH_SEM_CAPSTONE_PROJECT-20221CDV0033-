import { useState, useEffect, useRef } from 'react';
import { sendChatMessage, getChatSuggestions } from '../utils/api';

function Chatbot({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: `Hi ${user?.name || 'there'}! 👋 I'm ScholarBot, your DBT awareness assistant. How can I help you today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [language, setLanguage] = useState('English');
  const messagesEndRef = useRef(null);

  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati'];

  useEffect(() => {
    if (isOpen) {
      fetchSuggestions();
      scrollToBottom();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchSuggestions = async () => {
    try {
      const response = await getChatSuggestions();
      setSuggestions(response.data.suggestions.slice(0, 4));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText = null) => {
    const textToSend = messageText || inputMessage.trim();
    
    if (!textToSend) return;

    // Add user message
    const userMessage = {
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      // Build conversation history
      const conversationHistory = messages.map(msg => ({
        role: msg.role === 'bot' ? 'assistant' : 'user',
        content: msg.content
      }));

      const response = await sendChatMessage({
        message: textToSend,
        language: language,
        conversationHistory: conversationHistory
      });

      // Add bot response
      const botMessage = {
        role: 'bot',
        content: response.data.reply,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'bot',
        content: 'Sorry, I encountered an error. Please try again or contact support at 1800-118-111.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (question) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#1a4d8f',
            color: 'white',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '380px',
          height: '600px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #1a4d8f 0%, #ff9933 100%)',
            color: 'white',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '32px' }}>🤖</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px' }}>ScholarBot</h3>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              ✕
            </button>
          </div>

          {/* Language Selector */}
          <div style={{ 
            padding: '8px 16px', 
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ddd'
          }}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>🌐 {lang}</option>
              ))}
            </select>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            backgroundColor: '#f9f9f9'
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '12px'
                }}
              >
                <div style={{
                  maxWidth: '75%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: msg.role === 'user' ? '#1a4d8f' : 'white',
                  color: msg.role === 'user' ? 'white' : '#333',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  wordWrap: 'break-word'
                }}>
                  {msg.content}
                  <div style={{
                    fontSize: '10px',
                    marginTop: '4px',
                    opacity: 0.7
                  }}>
                    {new Date(msg.timestamp).toLocaleTimeString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <span>Typing</span>
                  <span className="typing-dots">...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && suggestions.length > 0 && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'white',
              borderTop: '1px solid #ddd'
            }}>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                Quick questions:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {suggestions.map(sug => (
                  <button
                    key={sug.id}
                    onClick={() => handleSuggestionClick(sug.question)}
                    style={{
                      padding: '6px 10px',
                      fontSize: '12px',
                      backgroundColor: '#f0f7ff',
                      color: '#1a4d8f',
                      border: '1px solid #1a4d8f',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#1a4d8f';
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#f0f7ff';
                      e.target.style.color = '#1a4d8f';
                    }}
                  >
                    {sug.question.length > 30 ? sug.question.substring(0, 30) + '...' : sug.question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div style={{
            padding: '12px 16px',
            backgroundColor: 'white',
            borderTop: '1px solid #ddd',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '10px 12px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputMessage.trim()}
              style={{
                padding: '10px 16px',
                backgroundColor: '#1a4d8f',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                opacity: (loading || !inputMessage.trim()) ? 0.5 : 1
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes typing {
          0%, 20% { content: '.'; }
          40% { content: '..'; }
          60%, 100% { content: '...'; }
        }
        .typing-dots::after {
          content: '...';
          animation: typing 1.4s infinite;
        }
      `}</style>
    </>
  );
}

export default Chatbot;