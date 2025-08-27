import express from 'express';
import { registerVendor, vendordetails,isregistered,authMiddleware } from '../controllers/vendorController.js';


const router = express.Router();
router.get('/isregistered',authMiddleware,isregistered);
router.post('/register', authMiddleware,registerVendor);
//router.get('/profile', authenticateCognito, getVendorProfile);

export default router; 