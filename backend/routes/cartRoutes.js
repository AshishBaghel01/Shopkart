import express from 'express';
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateCartQuantity,
} from '../controllers/cartController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All cart routes are protected
router.post('/add', authenticate, addToCart);
router.get('/', authenticate, getCart);
router.put('/remove', authenticate, removeFromCart);
router.put('/update', authenticate, updateCartQuantity);
router.delete('/clear', authenticate, clearCart);

export default router;
