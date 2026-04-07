import express from 'express';
import { 
  getQuizQuestions,
  checkAnswer,
  createQuiz
} from '../controllers/quizController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getQuizQuestions);
router.post('/check', protect, checkAnswer);
router.post('/', createQuiz);

export default router;