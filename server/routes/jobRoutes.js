import express from 'express';
import { scrapeJobs } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/scrape', protect, scrapeJobs);

export default router;
