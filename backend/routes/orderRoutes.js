import express from 'express';
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  verifyStripe,
  cancelOrder,
} from '../controllers/orderController.js';
import { authenticate, authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// User routes (protected)
router.post('/create', authenticate, createOrder);
router.get('/user', authenticate, getUserOrders);
router.get('/user/:id', authenticate, getOrderById);
router.put('/:id/cancel', authenticate, cancelOrder);

// Admin routes (protected)
router.get('/admin/list', authenticate, authenticateAdmin, getAllOrders);
router.put('/admin/:id/status', authenticate, authenticateAdmin, updateOrderStatus);

// Payment verification
router.get('/verify/:success/:orderId', verifyStripe);

export default router;
