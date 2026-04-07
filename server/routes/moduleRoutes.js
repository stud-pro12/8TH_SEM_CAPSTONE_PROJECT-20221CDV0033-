import express from 'express';
import { 
  getAllModules, 
  getModule,
  createModule
} from '../controllers/moduleController.js';

const router = express.Router();

router.get('/', getAllModules);
router.get('/:id', getModule);
router.post('/', createModule);

export default router;