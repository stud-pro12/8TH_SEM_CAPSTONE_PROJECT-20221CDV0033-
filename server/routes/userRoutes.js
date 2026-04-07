import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getUserProfile,
  updateProgress,
  updateQuizScore
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/progress', protect, updateProgress);
router.put('/quiz-score', protect, updateQuizScore);

export default router;