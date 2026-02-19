import express from 'express';
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getBestSellers,
} from '../controllers/productController.js';
import { authenticate, authenticateAdmin } from '../middleware/auth.js';
import upload from '../config/multer.js';

const router = express.Router();

// Public routes
router.get('/list', getProducts);
router.get('/list/:id', getProductById);
router.get('/category/:category', getProductsByCategory);
router.get('/best-sellers', getBestSellers);

// Admin routes (protected)
router.post('/add', authenticate, authenticateAdmin, upload.array('images', 5), addProduct);
router.put('/update/:id', authenticate, authenticateAdmin, upload.array('images', 5), updateProduct);
router.delete('/delete/:id', authenticate, authenticateAdmin, deleteProduct);

export default router;
