import express from 'express';
import { getBills, getBillById, downloadBill, getBillStats } from '../controllers/billController.js';
import { authMiddleware } from '../controllers/vendorController.js';

const router = express.Router();

// Get bills for vendor or customer
router.get('/vendor/:vendorId', authMiddleware, getBills);
router.get('/customer/:customerEmail', authMiddleware, getBills);

// Get specific bill details
router.get('/:billId', authMiddleware, getBillById);

// Download bill (get presigned URL)
router.get('/:billId/download', authMiddleware, downloadBill);

// Get bill statistics
router.get('/stats/:vendorId', authMiddleware, getBillStats);

export default router; 