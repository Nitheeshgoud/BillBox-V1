import express from 'express';
import { exchangeCodeForTokens } from '../controllers/authController.js';

const router = express.Router();

router.post('/token', exchangeCodeForTokens);

export default router; 