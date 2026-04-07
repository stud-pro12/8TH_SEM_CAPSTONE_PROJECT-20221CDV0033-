import express from 'express';
import { submitFeedback, getUserFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/submit', submitFeedback);
router.get('/my-feedback', getUserFeedback);

export default router;