import express from 'express';
import { 
  sendSMS,
  sendModuleCompletionSMS,
  sendQuizCompletionSMS,
  sendCertificateSMS,
  sendDBTStatusSMS,
  sendWelcomeSMS,
  sendReminderSMS,
  getNotificationSettings
} from '../controllers/notificationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// General SMS
router.post('/send-sms', protect, sendSMS);

// Specific notifications
router.post('/module-completion', protect, sendModuleCompletionSMS);
router.post('/quiz-completion', protect, sendQuizCompletionSMS);
router.post('/certificate', protect, sendCertificateSMS);
router.post('/dbt-status', protect, sendDBTStatusSMS);
router.post('/welcome', protect, sendWelcomeSMS);
router.post('/reminder', protect, sendReminderSMS);

// Settings
router.get('/settings', protect, getNotificationSettings);

export default router;