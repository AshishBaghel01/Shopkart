import express from 'express';
import {
  adminLogin,
  getAllUsers,
  getDashboardStats,
  deleteUser,
} from '../controllers/adminController.js';
import { authenticate, authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.post('/login', adminLogin);

// Protected admin routes
router.get('/users', authenticate, authenticateAdmin, getAllUsers);
router.get('/dashboard', authenticate, authenticateAdmin, getDashboardStats);
router.delete('/users/:id', authenticate, authenticateAdmin, deleteUser);

export default router;
