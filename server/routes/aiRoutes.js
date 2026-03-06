import express from 'express';
import { generateJobSummary, generateJobMatch } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/job-summary', protect, generateJobSummary);
router.post('/job-match', protect, generateJobMatch);

export default router;
