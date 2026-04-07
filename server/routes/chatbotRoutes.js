import express from 'express';
import { 
  sendMessage, 
  getSuggestedQuestions,
  translateMessage 
} from '../controllers/chatbotController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/message', protect, sendMessage);
router.get('/suggestions', getSuggestedQuestions);
router.post('/translate', protect, translateMessage);

export default router;