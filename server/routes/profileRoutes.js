import express from 'express';
import { getProfile, updateProfile, deleteImage, uploadImage } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.delete('/image', protect, deleteImage);
router.post('/image', protect, uploadImage);

export default router;
