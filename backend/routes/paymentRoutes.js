import express from 'express';
import {
  createStripePaymentIntent,
  verifyStripePayment,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from '../controllers/paymentController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Stripe routes
router.post('/stripe/create-intent', authenticate, createStripePaymentIntent);
router.post('/stripe/verify', authenticate, verifyStripePayment);

// Razorpay routes
router.post('/razorpay/create-order', authenticate, createRazorpayOrder);
router.post('/razorpay/verify', authenticate, verifyRazorpayPayment);

export default router;
