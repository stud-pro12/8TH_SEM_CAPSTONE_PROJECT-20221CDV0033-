import express from 'express';
import { 
  checkDBTStatus,
  verifyAadhaar,
  getBankDetails
} from '../controllers/dbtController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/check-status', protect, checkDBTStatus);
router.post('/verify-aadhaar', protect, verifyAadhaar);
router.post('/bank-details', protect, getBankDetails);

export default router;