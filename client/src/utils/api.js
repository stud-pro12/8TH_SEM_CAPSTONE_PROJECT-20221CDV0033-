import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User APIs
export const registerUser = (data) => api.post('/users/register', data);
export const loginUser = (data) => api.post('/users/login', data);
export const getUserProfile = () => api.get('/users/profile');
export const updateProgress = (data) => api.put('/users/progress', data);
export const updateQuizScore = (data) => api.put('/users/quiz-score', data);

// Module APIs
export const getAllModules = () => api.get('/modules');
export const getModule = (id) => api.get(`/modules/${id}`);

// Quiz APIs
export const getQuizQuestions = () => api.get('/quiz');
export const checkAnswer = (data) => api.post('/quiz/check', data);

// Chatbot APIs
export const sendChatMessage = (data) => api.post('/chatbot/message', data);
export const getChatSuggestions = () => api.get('/chatbot/suggestions');
export const translateText = (data) => api.post('/chatbot/translate', data);
// DBT Checker APIs
export const checkDBTStatus = (data) => api.post('/dbt/check-status', data);
export const verifyAadhaar = (data) => api.post('/dbt/verify-aadhaar', data);
export const getBankDetails = (data) => api.post('/dbt/bank-details', data);

// Notification APIs
export const sendSMS = (data) => api.post('/notifications/send-sms', data);
export const sendModuleCompletionNotification = (data) => api.post('/notifications/module-completion', data);
export const sendQuizCompletionNotification = (data) => api.post('/notifications/quiz-completion', data);
export const sendCertificateNotification = () => api.post('/notifications/certificate');
export const sendDBTStatusNotification = (data) => api.post('/notifications/dbt-status', data);
export const sendWelcomeNotification = () => api.post('/notifications/welcome');
export const sendReminderNotification = () => api.post('/notifications/reminder');
export const getNotificationSettings = () => api.get('/notifications/settings');
// Feedback APIs
export const submitFeedback = (data) => api.post('/feedback/submit', data);
export const getUserFeedback = (userId) => api.get('/feedback/my-feedback', { params: { userId } });

export default api;